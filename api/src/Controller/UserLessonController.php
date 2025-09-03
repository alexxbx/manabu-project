<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Lesson;
use App\Entity\Progression;
use App\Repository\LessonRepository;
use App\Repository\ProgressionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserLessonController extends AbstractController
{
    #[Route('/api/user/{id}/lessons-unlocked', name: 'user_lessons_status', methods: ['GET'])]
    public function getLessonsWithStatus(
        User $user,
        LessonRepository $lessonRepository,
        ProgressionRepository $progressionRepository,
        EntityManagerInterface $em
    ): JsonResponse {

        $lessons = $lessonRepository->findBy([], ['position' => 'ASC']);
        $firstLessonId = $lessons[0]->getId();

        $data = [];

        foreach ($lessons as $lesson) {
            $progression = $progressionRepository->findOneBy([
                'user' => $user,
                'lesson' => $lesson
            ]);

            if ($progression) {
                $isUnlocked = $progression->isUnlocked();
                $completed = $progression->isCompleted();
            } else {
                $isUnlocked = $lesson->getId() === $firstLessonId; // première leçon débloquée
                $completed = false;

                // créer la progression si c’est la première leçon
                if ($isUnlocked) {
                    $progression = new Progression();
                    $progression->setUser($user);
                    $progression->setLesson($lesson);
                    $progression->setUnlocked(true);
                    $progression->setCompleted(false);
                    $em->persist($progression);
                    $em->flush();
                }
            }

            $data[] = [
                'id' => $lesson->getId(),
                'title' => $lesson->getTitle(),
                'position' => $lesson->getposition(),
                'unlocked' => $isUnlocked,
                'completed' => $completed,
            ];
        }

        return $this->json($data);
    }
}
