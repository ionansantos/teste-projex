<?php

namespace App\Entity;

use App\Repository\ImovelRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImovelRepository::class)]
class Imovel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\Column(type: "text")]
    private string $description;

    #[ORM\Column(type: "decimal", precision: 10, scale: 2)]
    private float $purchasePrice;

    #[ORM\Column(type: "decimal", precision: 10, scale: 2)]
    private float $salePrice;

    #[ORM\Column(type: "decimal", precision: 5, scale: 2)]
    private float $profitPercentage;

    #[ORM\Column(type: "boolean")]
    private bool $inStock;

    #[ORM\Column(type: "string", length: 36, unique: true)]
    private string $photoId;

    /**
     * @ORM\ManyToOne(targetEntity: User::class, inversedBy: "imoveis")
     * @ORM\JoinColumn(name: "owner_id", referencedColumnName: "id", onDelete: "CASCADE")
     */
    private User $owner;

    public function __construct()
    {
        $this->photoId = Uuid::v4();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getPurchasePrice(): float
    {
        return $this->purchasePrice;
    }

    public function setPurchasePrice(float $purchasePrice): void
    {
        $this->purchasePrice = $purchasePrice;
    }

    public function getSalePrice(): float
    {
        return $this->salePrice;
    }

    public function setSalePrice(float $salePrice): void
    {
        $this->salePrice = $salePrice;
    }

    public function getProfitPercentage(): float
    {
        return $this->profitPercentage;
    }

    public function setProfitPercentage(float $profitPercentage): void
    {
        $this->profitPercentage = $profitPercentage;
    }

    public function isInStock(): bool
    {
        return $this->inStock;
    }

    public function setInStock(bool $inStock): void
    {
        $this->inStock = $inStock;
    }

    public function getPhotoId(): string
    {
        return $this->photoId;
    }

    public function setPhotoId(string $photoId): void
    {
        $this->photoId = $photoId;
    }

    public function getOwner(): User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): void
    {
        $this->owner = $owner;
    }
    
}
