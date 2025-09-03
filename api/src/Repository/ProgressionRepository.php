<?php
namespace App\Repository;

use App\Entity\Progression;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProgressionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Progression::class);
    }

    public function findByUserAndLesson(int $userId, int $lessonId): ?Progression
    {
        return $this->findOneBy(['user' => $userId, 'lesson' => $lessonId]);
    }

    // src/Repository/ProgressionRepository.php
public function findProgressionForUserAndLesson(int $userId, int $lessonId): ?Progression
{
    return $this->findOneBy(['user' => $userId, 'lesson' => $lessonId]);
}

public function findLastCompletedLesson(int $userId): ?Progression
{
    return $this->createQueryBuilder('p')
        ->join('p.lesson', 'l')
        ->where('p.user = :userId')
        ->andWhere('p.completed = true')
        ->setParameter('userId', $userId)
        ->orderBy('l.id', 'DESC')   // <— ID au lieu de "position"
        ->setMaxResults(1)
        ->getQuery()
        ->getOneOrNullResult();
}

public function findUnlockedLessonsByUser(int $userId): array
{
    return $this->createQueryBuilder('p')
        ->join('p.lesson', 'l')
        ->addSelect('l')
        ->where('p.user = :userId')
        ->andWhere('p.unlocked = true')
        ->setParameter('userId', $userId)
        ->orderBy('l.id', 'ASC')
        ->getQuery()
        ->getResult();
}

}
