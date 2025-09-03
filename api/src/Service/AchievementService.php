<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Achievement;
use App\Entity\UserAchievement;
use App\Repository\AchievementRepository;
use App\Repository\UserAchievementRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class AchievementService
{
    private EntityManagerInterface $entityManager;
    private AchievementRepository $achievementRepository;
    private UserAchievementRepository $userAchievementRepository;
    private LoggerInterface $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        AchievementRepository $achievementRepository,
        UserAchievementRepository $userAchievementRepository,
        LoggerInterface $logger
    ) {
        $this->entityManager = $entityManager;
        $this->achievementRepository = $achievementRepository;
        $this->userAchievementRepository = $userAchievementRepository;
        $this->logger = $logger;
    }

    /**
     * Vérifie et débloque les achievements pour un utilisateur.
     * Retourne les achievements débloqués dans un tableau.
     */
    public function checkAndUnlockAchievements(User $user): array
    {
        $this->logger->info('Vérification des achievements pour l\'utilisateur', ['userId' => $user->getId()]);

        // Compter le nombre de leçons complétées
        $completedLessons = $this->countCompletedLessons($user);

        // Récupérer les achievements globaux pouvant être débloqués
        $achievements = $this->achievementRepository->findAchievementsByRequiredLessons($completedLessons);

        $unlockedAchievements = [];

        foreach ($achievements as $achievement) {
            // Vérifier si l'utilisateur a déjà débloqué ce achievement
            $existing = $this->userAchievementRepository->findOneBy([
                'user' => $user,
                'achievement' => $achievement
            ]);

            if ($existing) {
                continue;
            }

            // Créer un UserAchievement pour l'utilisateur
            $userAchievement = new UserAchievement();
            $userAchievement->setUser($user);
            $userAchievement->setAchievement($achievement);
            $userAchievement->setUnlockedAt(new \DateTime());

            $this->entityManager->persist($userAchievement);
            $unlockedAchievements[] = [
                'id' => $achievement->getId(),
                'title' => $achievement->getTitle(),
                'description' => $achievement->getDescription(),
                'icon' => $achievement->getIcon()
            ];

            $this->logger->info('Achievement débloqué', ['title' => $achievement->getTitle()]);
        }

        $this->entityManager->flush();

        return $unlockedAchievements;
    }

    /**
     * Compte le nombre de leçons complétées par l'utilisateur.
     */
    private function countCompletedLessons(User $user): int
    {
        $qb = $this->entityManager->createQueryBuilder();
        return (int) $qb->select('COUNT(p.id)')
            ->from('App\Entity\Progression', 'p')
            ->where('p.user = :user')
            ->andWhere('p.completed = true')
            ->setParameter('user', $user)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
