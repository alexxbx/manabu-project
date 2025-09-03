<?php
namespace App\Repository;

use App\Entity\Lesson;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class LessonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Lesson::class);
    }

    public function findAllOrdered(): array
    {
        // Récupère toutes les leçons triées par ID
        return $this->createQueryBuilder('l')
            ->orderBy('l.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findNextLessonById(int $currentLessonId): ?Lesson
    {
        return $this->createQueryBuilder('l')
            ->where('l.id > :id')
            ->setParameter('id', $currentLessonId)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // src/Repository/LessonRepository.php
public function findFirst(): ?Lesson
{
    return $this->createQueryBuilder('l')
        ->orderBy('l.id', 'ASC')
        ->setMaxResults(1)
        ->getQuery()
        ->getOneOrNullResult();
}

public function findNextById(Lesson $current): ?Lesson
{
    return $this->createQueryBuilder('l')
        ->where('l.id > :id')
        ->setParameter('id', $current->getId())
        ->orderBy('l.id', 'ASC')
        ->setMaxResults(1)
        ->getQuery()
        ->getOneOrNullResult();
}

}
