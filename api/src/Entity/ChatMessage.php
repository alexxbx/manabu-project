<?php

namespace App\Entity;

use App\Repository\ChatMessageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['chat:read']],
    denormalizationContext: ['groups' => ['chat:write']]
)]
#[ORM\Entity(repositoryClass: ChatMessageRepository::class)]
class ChatMessage
{
    public const CHAT_READ_GROUP = 'chat:read';
    public const CHAT_WRITE_GROUP = 'chat:write';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::CHAT_READ_GROUP])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'chatMessages')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups([self::CHAT_READ_GROUP, self::CHAT_WRITE_GROUP])]
    private ?User $user = null;

    #[ORM\Column(type: 'text')]
    #[Groups([self::CHAT_READ_GROUP, self::CHAT_WRITE_GROUP])]
    private ?string $message = null;

    #[ORM\Column]
    #[Groups([self::CHAT_READ_GROUP])]
    private ?bool $isFromUser = null;

    #[ORM\Column]
    #[Groups([self::CHAT_READ_GROUP])]
    private ?\DateTimeImmutable $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;
        return $this;
    }

    public function isFromUser(): ?bool
    {
        return $this->isFromUser;
    }

    public function setIsFromUser(bool $isFromUser): static
    {
        $this->isFromUser = $isFromUser;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }
} 