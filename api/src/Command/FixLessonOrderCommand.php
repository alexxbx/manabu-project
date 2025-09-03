<?php

namespace App\Command;

use App\Entity\Lesson;
use App\Entity\Progression;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(
    name: 'app:update-lessons-position', // <- nom de la commande
    description: 'Met à jour les orders des leçons et débloque la première leçon pour tous les utilisateurs.'
)]
class FixLessonOrderCommand extends Command
{
    public function __construct(private EntityManagerInterface $em)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $lessons = $this->em->getRepository(Lesson::class)->findBy([], ['id' => 'ASC']);
        $position = 1;

        foreach ($lessons as $lesson) {
            $lesson->setposition($position++);
            $this->em->persist($lesson);
        }

        $this->em->flush();
        $output->writeln('Ordres des leçons mis à jour.');

        // Corriger les progressions
        $users = $this->em->getRepository(\App\Entity\User::class)->findAll();
        foreach ($users as $user) {
            foreach ($lessons as $index => $lesson) {
                $progression = $this->em->getRepository(Progression::class)
                    ->findOneBy(['user' => $user, 'lesson' => $lesson]);
                if ($progression) {
                    $progression->setUnlocked($index === 0); // seule la première leçon débloquée
                    $this->em->persist($progression);
                }
            }
        }

        $this->em->flush();
        $output->writeln('Progressions mises à jour.');

        return Command::SUCCESS;
    }
}
