<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProgressionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProgressionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['progression:read']],
    denormalizationContext: ['groups' => ['progression:write']]
)]
class Progression
{
    public const PROGRESSION_READ_GROUP = 'progression:read';
    public const PROGRESSION_WRITE_GROUP = 'progression:write';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::PROGRESSION_READ_GROUP])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, cascade: ["persist"], inversedBy: 'progressions')] 
    #[Groups([self::PROGRESSION_READ_GROUP, self::PROGRESSION_WRITE_GROUP])]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Lesson::class)]
    #[ORM\JoinColumn(name: "lesson_id", referencedColumnName: "id", onDelete: "CASCADE")]
    private ?Lesson $lesson = null;
    

    #[ORM\Column(type: 'boolean')]
    #[Groups([self::PROGRESSION_READ_GROUP, self::PROGRESSION_WRITE_GROUP])]
    private bool $completed = false;

    #[ORM\Column(type: 'datetime')]
    #[Groups([self::PROGRESSION_READ_GROUP])]
    private \DateTimeInterface $updatedAt;

        
    #[ORM\Column(type:"boolean")]

    private $unlocked = false;

    public function __construct()
    {
        $this->updatedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(?Lesson $lesson): self
    {
        $this->lesson = $lesson;
        return $this;
    }

    public function isCompleted(): bool
    {
        return $this->completed;
    }

    public function setCompleted(bool $completed): self
    {
        $this->completed = $completed;
        $this->updatedAt = new \DateTime();
        return $this;
    }

    public function getUpdatedAt(): \DateTimeInterface
    {
        return $this->updatedAt;
    }



    public function getUnlocked(): bool
    {
        return $this->unlocked;
    }

    public function setUnlocked(bool $unlocked): self
    {
        $this->unlocked = $unlocked;
        return $this;
    }

    public function isUnlocked(): bool
    {
        return $this->unlocked;
    }
}
