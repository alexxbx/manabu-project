<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Lesson;
use App\Entity\Progression;
use Doctrine\ORM\EntityManagerInterface;

class LessonUnlockService
{
    public function __construct(private EntityManagerInterface $em) {}

    /**
     * Débloque la leçon suivante pour l’utilisateur
     */
    public function unlockNextLesson(User $user, Lesson $lesson): void
    {
        $currentposition = $lesson->getposition();
        $nextposition = $currentposition + 1;

        // Cherche la prochaine leçon
        $nextLesson = $this->em->getRepository(Lesson::class)
            ->findOneBy(['position' => $nextposition]);

        if (!$nextLesson) {
            dump("Aucune leçon trouvée avec position = $nextposition");
            return; // pas de leçon suivante
        }

        // Cherche la progression de l'utilisateur pour cette prochaine leçon
        $nextProgression = $this->em->getRepository(Progression::class)
            ->findOneBy(['user' => $user, 'lesson' => $nextLesson]);

        if (!$nextProgression) {
            dump("Progression introuvable pour l'utilisateur {$user->getId()} et la leçon {$nextLesson->getId()}");
            return;
        }

        if ($nextProgression->isUnlocked()) {
            dump("La leçon {$nextLesson->getId()} est déjà débloquée pour l'utilisateur {$user->getId()}");
            return;
        }

        // Débloque la leçon
        $nextProgression->setUnlocked(true);
        $this->em->persist($nextProgression);
        $this->em->flush();

        dump("Leçon suivante débloquée ! Utilisateur: {$user->getId()}, Leçon: {$nextLesson->getId()}");
    }
}
