<?php

namespace App\Entity;

use App\Entity\Exercise;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LessonRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\EventListener\LessonPositionListener;

#[ApiResource(
    normalizationContext: ['groups' => ['lesson:read']],
    denormalizationContext: ['groups' => ['lesson:write']]
)]
#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[ORM\EntityListeners([LessonPositionListener::class])]
#[ORM\HasLifecycleCallbacks]
class Lesson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['lesson:read'])]
    private ?int $id = null;

    #[Groups(['lesson:read', 'exercise:read', 'lesson:write'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['lesson:read', 'exercise:read', 'lesson:write'])]
    #[ORM\Column(type: 'text')]
    private ?string $content = null;

    #[Groups(['lesson:read', 'exercise:read', 'lesson:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $level = null;

    #[ORM\Column(type: 'integer')]
    private ?int $position = 0;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: Exercise::class, orphanRemoval: true, cascade: ['remove'])]
    private Collection $exercises;

    public function __construct()
    {
        $this->exercises = new ArrayCollection();
    }

    // -------------------------
    // Getters & Setters
    // -------------------------
    public function getId(): ?int { return $this->id; }

    public function getTitle(): ?string { return $this->title; }
    public function setTitle(string $title): static { $this->title = $title; return $this; }

    public function getContent(): ?string { return $this->content; }
    public function setContent(string $content): static { $this->content = $content; return $this; }

    public function getLevel(): ?string { return $this->level; }
    public function setLevel(?string $level): static { $this->level = $level; return $this; }

    public function getPosition(): ?int { return $this->position; }
    public function setPosition(int $position): static { $this->position = $position; return $this; }

    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): static { $this->createdAt = $createdAt; return $this; }

    public function getExercises(): Collection { return $this->exercises; }
    public function addExercise(Exercise $exercise): static {
        if (!$this->exercises->contains($exercise)) {
            $this->exercises[] = $exercise;
            $exercise->setLesson($this);
        }
        return $this;
    }
    public function removeExercise(Exercise $exercise): static {
        if ($this->exercises->removeElement($exercise)) {
            if ($exercise->getLesson() === $this) {
                $exercise->setLesson(null);
            }
        }
        return $this;
    }
}
