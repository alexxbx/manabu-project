<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        // Ajouter les rôles au payload
        $payload = $event->getData();
        $payload['roles'] = $user->getRoles();

        $event->setData($payload);
    }
}
