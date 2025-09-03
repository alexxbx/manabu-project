<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Lesson;
use App\Entity\Progression;
use App\Repository\UserRepository;
use App\Service\AchievementService;
use App\Repository\LessonRepository;
use App\Service\LessonUnlockService;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProgressionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/lessons')]
class LessonController extends AbstractController
{
    public function __construct(private ValidatorInterface $validator) {}

    #[Route('', name: 'lesson_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        // ✅ CORRECTION : 'position' au lieu de 'order'
        $lessons = $em->getRepository(Lesson::class)->findBy([], ['position' => 'ASC']);
        return $this->json($lessons, Response::HTTP_OK, [], ['groups' => 'lesson:read']);
    }

    #[Route('/{id}', name: 'lesson_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $lesson = $em->getRepository(Lesson::class)->find($id);
        if (!$lesson) {
            return $this->json(['error' => 'Leçon introuvable'], Response::HTTP_NOT_FOUND);
        }
        return $this->json($lesson, Response::HTTP_OK, [], ['groups' => 'lesson:read']);
    }

    #[Route('', name: 'lesson_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true) ?? [];

        $lesson = new Lesson();
        $lesson->setTitle($data['title'] ?? '');
        $lesson->setContent($data['content'] ?? '');
        $lesson->setLevel($data['level'] ?? 'Débutant');
        $lesson->setCreatedAt(new \DateTimeImmutable());

        // ✅ plus besoin de gérer la position ici (c’est le listener qui s’en occupe)

        // Validation
        $errors = $this->validator->validate($lesson);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string)$errors], Response::HTTP_BAD_REQUEST);
        }

        $em->persist($lesson);
        $em->flush();

        return $this->json($lesson, Response::HTTP_CREATED, [], ['groups' => 'lesson:read']);
    }



    #[Route('/{lessonId}/complete', name: 'lesson_complete', methods: ['POST'])]
public function completeLesson(
    int $lessonId,
    EntityManagerInterface $em,
    LessonRepository $lessonRepository,
    ProgressionRepository $progressionRepository,
    AchievementService $achievementService
): JsonResponse {
    /** @var User $user */
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['error' => 'Utilisateur non connecté'], Response::HTTP_UNAUTHORIZED);
    }

    $lesson = $lessonRepository->find($lessonId);
    if (!$lesson) {
        return $this->json(['error' => 'Leçon introuvable'], Response::HTTP_NOT_FOUND);
    }

    $progression = $progressionRepository->findOneBy(['user' => $user, 'lesson' => $lesson]);
    if (!$progression) {
        $progression = new Progression();
        $progression->setUser($user)
                    ->setLesson($lesson)
                    ->setCompleted(false);
        $em->persist($progression);
    }

    $progression->setCompleted(true);

    // Débloquer la leçon suivante
    $nextLesson = $lessonRepository->findOneBy(['position' => $lesson->getPosition() + 1]);
    if ($nextLesson) {
        $nextProgression = $progressionRepository->findOneBy(['user' => $user, 'lesson' => $nextLesson]);
        if (!$nextProgression) {
            $nextProgression = new Progression();
            $nextProgression->setUser($user)
                            ->setLesson($nextLesson)
                            ->setCompleted(false)
                            ->setUnlocked(true);
            $em->persist($nextProgression);
        } else {
            $nextProgression->setUnlocked(true);
        }
    }

    $em->flush(); // flush avant d'appeler le service

    // ✅ Appel correct du service avec l'objet User
    $unlockedAchievements = $achievementService->checkAndUnlockAchievements($user);

    return $this->json([
        'success' => true,
        'lessonId' => $lessonId,
        'completed' => true,
        'unlockedAchievements' => $unlockedAchievements
    ]);
}


    #[Route('/user/{id}/lessons-unlocked', name: 'api_user_lessons_unlocked', methods: ['GET'])]
    public function getUnlockedLessons(int $id, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->find($id);
        if (!$user) {
            return $this->json(['error' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // ✅ CORRECTION : Utilisation d'un QueryBuilder pour trier correctement
        $progressions = $em->createQueryBuilder()
            ->select('p', 'l')
            ->from(Progression::class, 'p')
            ->leftJoin('p.lesson', 'l')
            ->where('p.user = :user')
            ->setParameter('user', $user)
            ->orderBy('l.position', 'ASC')
            ->getQuery()
            ->getResult();

        $lessons = array_map(fn($p) => [
            'id' => $p->getLesson()->getId(),
            'title' => $p->getLesson()->getTitle(),
            'content' => $p->getLesson()->getContent() ?? '',
            'position' => $p->getLesson()->getPosition(),
            'level' => $p->getLesson()->getLevel(),
            'unlocked' => $p->isUnlocked(),
            'completed' => $p->isCompleted()
        ], $progressions);

        return $this->json($lessons);
    }

    #[Route('/{id}', name: 'lesson_update', methods: ['PUT', 'PATCH'])]
    public function update(
        int $id,
        Request $request,
        EntityManagerInterface $em,
        LessonRepository $lessonRepository
    ): JsonResponse {
        $lesson = $lessonRepository->find($id);
        if (!$lesson) {
            return $this->json(['error' => 'Leçon introuvable'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true) ?? [];

        if (isset($data['title'])) {
            $lesson->setTitle($data['title']);
        }
        if (isset($data['content'])) {
            $lesson->setContent($data['content']);
        }
        if (isset($data['level'])) {
            $lesson->setLevel($data['level']);
        }

        $em->flush();

        return $this->json($lesson, Response::HTTP_OK, [], ['groups' => 'lesson:read']);
    }
}
