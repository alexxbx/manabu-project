<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserAchievementRepository;
use App\Repository\AchievementRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class AchievementController extends AbstractController
{
    private UserAchievementRepository $userAchievementRepo;
    private AchievementRepository $achievementRepo;
    private LoggerInterface $logger;

    public function __construct(
        UserAchievementRepository $userAchievementRepo,
        AchievementRepository $achievementRepo,
        LoggerInterface $logger
    ) {
        $this->userAchievementRepo = $userAchievementRepo;
        $this->achievementRepo = $achievementRepo;
        $this->logger = $logger;
    }

    #[Route('/api/user/{userId}/achievements', name: 'get_user_achievements', methods: ['GET'], requirements: ['userId' => '\d+'])]
    public function getUserAchievements($userId, EntityManagerInterface $em): JsonResponse
    {
        try {
            $user = $em->getRepository(User::class)->find((int)$userId);
            if (!$user) {
                return $this->json(['error' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Achievements débloqués
            $unlocked = $this->userAchievementRepo->findUnlockedByUser($user);

            // Achievements verrouillés
            $lockedAchievements = $this->achievementRepo->findAll();
            $locked = array_filter($lockedAchievements, function($ach) use ($unlocked) {
                foreach ($unlocked as $u) {
                    if ($u->getAchievement()->getId() === $ach->getId()) return false;
                }
                return true;
            });

            $response = [
                'unlocked' => array_map(function($ua) {
                    $a = $ua->getAchievement();
                    return [
                        'id' => $a->getId(),
                        'title' => $a->getTitle(),
                        'description' => $a->getDescription(),
                        'icon' => $a->getIcon(),
                        'unlockedAt' => $ua->getUnlockedAt()?->format('Y-m-d H:i:s')
                    ];
                }, $unlocked),
                'locked' => array_map(function($a) {
                    return [
                        'id' => $a->getId(),
                        'title' => $a->getTitle(),
                        'description' => $a->getDescription(),
                        'icon' => $a->getIcon(),
                        'requiredLessons' => $a->getRequiredLessons()
                    ];
                }, $locked)
            ];

            return $this->json($response);
        } catch (\Exception $e) {
            $this->logger->error('Erreur lors de la récupération des succès', [
                'userId' => $userId,
                'error' => $e->getMessage()
            ]);
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
