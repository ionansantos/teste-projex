<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 255, unique: true)]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $password;

    /**
     * @ORM\OneToMany(targetEntity="Imovel", mappedBy="owner")
     */
    private Collection $imoveis;

    public function __construct()
    {
        $this->imoveis = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return Collection|Imovel[]
     */
    public function getImoveis(): Collection
    {
        return $this->imoveis;
    }

    public function addImovel(Imovel $imovel): void
    {
        if (!$this->imoveis->contains($imovel)) {
            $this->imoveis[] = $imovel;
            $imovel->setOwner($this);
        }
    }

    public function removeImovel(Imovel $imovel): void
    {
        if ($this->imoveis->contains($imovel)) {
            $this->imoveis->removeElement($imovel);
            // Defina o proprietário do imóvel como nulo, se desejar.
            $imovel->setOwner(null);
        }
    }
}
