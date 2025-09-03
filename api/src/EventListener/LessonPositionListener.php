<?php

namespace App\EventListener;

use App\Entity\Lesson;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class LessonPositionListener
{
    public function prePersist(Lesson $lesson, LifecycleEventArgs $args): void
    {
        $em = $args->getObjectManager();

        $lastLesson = $em->getRepository(Lesson::class)->findOneBy([], ['position' => 'DESC']);
        $nextPosition = $lastLesson ? $lastLesson->getPosition() + 1 : 1;

        $lesson->setPosition($nextPosition);
    }
}
