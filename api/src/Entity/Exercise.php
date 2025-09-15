<?php

namespace App\Entity;

use App\Entity\Lesson;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExerciseRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['exercise:read']],
    denormalizationContext: ['groups' => ['exercise:write']]
)]
#[ORM\Entity(repositoryClass: ExerciseRepository::class)]
class Exercise
{
    public const EXERCISE_READ_GROUP = 'exercise:read';
    public const EXERCISE_WRITE_GROUP = 'exercise:write';
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
    #[ORM\Column]
    private array $options = [];

    #[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
    #[ORM\Column(length: 255)]
    private ?string $answer = null;

    #[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $cours = null;

// ✅ Sérialise la relation vers Lesson (sans créer de boucle)
#[Groups([Exercise::EXERCISE_READ_GROUP, Exercise::EXERCISE_WRITE_GROUP])]
#[ORM\ManyToOne(targetEntity: Lesson::class, inversedBy: 'exercises')]
#[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
private ?Lesson $lesson = null;
    
    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }
    
    public function setLesson(?Lesson $lesson): static
    {
        $this->lesson = $lesson;
        return $this;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): static
    {
        $this->question = $question;

        return $this;
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function setOptions(array $options): static
    {
        $this->options = $options;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): static
    {
        $this->answer = $answer;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getCours(): ?string
    {
        return $this->cours;
    }

    public function setCours(?string $cours): static
    {
        $this->cours = $cours;
        return $this;
    }

    
}
