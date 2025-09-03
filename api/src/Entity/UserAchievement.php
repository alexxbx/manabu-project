<?php

namespace App\Entity;

use App\Repository\UserAchievementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserAchievementRepository::class)]
class UserAchievement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['userAchievement:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['userAchievement:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Achievement::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['userAchievement:read'])]
    private ?Achievement $achievement = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['userAchievement:read'])]
    private ?\DateTimeInterface $unlockedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getAchievement(): ?Achievement
    {
        return $this->achievement;
    }

    public function setAchievement(Achievement $achievement): self
    {
        $this->achievement = $achievement;
        return $this;
    }

    public function getUnlockedAt(): ?\DateTimeInterface
    {
        return $this->unlockedAt;
    }

    public function setUnlockedAt(?\DateTimeInterface $unlockedAt): self
    {
        $this->unlockedAt = $unlockedAt;
        return $this;
    }
}
