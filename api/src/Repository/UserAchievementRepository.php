<?php

namespace App\Repository;

use App\Entity\UserAchievement;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserAchievementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserAchievement::class);
    }

    /**
     * Trouve tous les achievements débloqués pour un utilisateur
     */
    public function findUnlockedByUser(User $user): array
    {
        return $this->createQueryBuilder('ua')
            ->andWhere('ua.user = :user')
            ->andWhere('ua.unlockedAt IS NOT NULL')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    /**
     * Trouve tous les achievements non débloqués pour un utilisateur
     */
    public function findLockedByUser(User $user): array
    {
        // Récupérer tous les UserAchievement de l'utilisateur
        $qb = $this->createQueryBuilder('ua')
            ->select('a')
            ->join('ua.achievement', 'a')
            ->andWhere('ua.user = :user')
            ->andWhere('ua.unlockedAt IS NULL')
            ->setParameter('user', $user);

        return $qb->getQuery()->getResult();
    }
}
