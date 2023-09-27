<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    public function login(): JsonResponse
    {
        return $this->json(
            'request login api',
        );
    }

    public function register(): JsonResponse
    {
        return $this->json(
            'request register api',
        );
    }
}
