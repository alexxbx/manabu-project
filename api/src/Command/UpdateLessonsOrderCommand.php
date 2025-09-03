<?php

namespace App\Command;

use App\Entity\Lesson;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:update-lessons-position',
    description: 'Met à jour le champ "position" des leçons selon leur ID croissant',
)]
class UpdateLessonsOrderCommand extends Command
{
    public function __construct(private EntityManagerInterface $em)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $lessonRepo = $this->em->getRepository(Lesson::class);
        $lessons = $lessonRepo->findBy([], ['id' => 'ASC']); // ou 'title' => 'ASC' si tu préfères

        $position = 1;
        foreach ($lessons as $lesson) {
            $lesson->setposition($position++);
            $output->writeln("Leçon '{$lesson->getTitle()}' -> position : " . $lesson->getposition());
        }

        $this->em->flush();
        $output->writeln('<info>Mise à jour terminée !</info>');

        return Command::SUCCESS;
    }
}
