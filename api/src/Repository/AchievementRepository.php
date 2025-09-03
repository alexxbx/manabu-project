<?php

namespace App\Repository;

use App\Entity\Achievement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class AchievementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Achievement::class);
    }

    /**
     * Récupère tous les achievements globaux qui nécessitent <= $completedLessons leçons
     */
    public function findAchievementsByRequiredLessons(int $completedLessons): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.requiredLessons <= :completed')
            ->setParameter('completed', $completedLessons)
            ->getQuery()
            ->getResult();
    }
}
