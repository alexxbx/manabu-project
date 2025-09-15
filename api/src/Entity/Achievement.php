<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AchievementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AchievementRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['achievement:read']],
    denormalizationContext: ['groups' => ['achievement:write']]
)]
class Achievement
{
    public const ACHIEVEMENT_READ_GROUP = 'achievement:read';
    public const ACHIEVEMENT_WRITE_GROUP = 'achievement:write';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([Achievement::ACHIEVEMENT_READ_GROUP])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Achievement::ACHIEVEMENT_READ_GROUP, Achievement::ACHIEVEMENT_WRITE_GROUP])]
    private ?string $title = null;

    #[ORM\Column(type: 'text')]
    #[Groups([Achievement::ACHIEVEMENT_READ_GROUP, Achievement::ACHIEVEMENT_WRITE_GROUP])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups([Achievement::ACHIEVEMENT_READ_GROUP, Achievement::ACHIEVEMENT_WRITE_GROUP])]
    private ?int $requiredLessons = null;

    #[ORM\Column(length: 255)]
    #[Groups([Achievement::ACHIEVEMENT_READ_GROUP, Achievement::ACHIEVEMENT_WRITE_GROUP])]
    private ?string $icon = null;

    // ✅ Plus de $user ou $unlockedAt ici, ça reste GLOBAL

    public function getId(): ?int { return $this->id; }
    public function getTitle(): ?string { return $this->title; }
    public function setTitle(string $title): self { $this->title = $title; return $this; }

    public function getDescription(): ?string { return $this->description; }
    public function setDescription(string $description): self { $this->description = $description; return $this; }

    public function getRequiredLessons(): ?int { return $this->requiredLessons; }
    public function setRequiredLessons(int $requiredLessons): self { $this->requiredLessons = $requiredLessons; return $this; }

    public function getIcon(): ?string { return $this->icon; }
    public function setIcon(string $icon): self { $this->icon = $icon; return $this; }
}
