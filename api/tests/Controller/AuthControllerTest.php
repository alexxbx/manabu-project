<?php
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthControllerTest extends WebTestCase
{
    private $client;
    private $em;
    private $passwordHasher;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->em = $this->client->getContainer()->get(EntityManagerInterface::class);
        $this->passwordHasher = $this->client->getContainer()->get(UserPasswordHasherInterface::class);

        // Créer un utilisateur de test
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setUsername('testuser'); // <-- ajouté
        $user->setPassword($this->passwordHasher->hashPassword($user, 'password123'));
        $user->setCreatedAt(new \DateTimeImmutable()); // obligatoire
        $this->em->persist($user);
        $this->em->flush();

    }

    public function testLoginWithValidCredentials()
    {
        $this->client->jsonRequest('POST', '/api/login_check', [
            'username' => 'testuser',
            'password' => 'password123',
        ]);

        $this->assertResponseIsSuccessful(); // 200 OK
    }

    public function testLoginWithInvalidCredentials()
    {
        $this->client->jsonRequest('POST', '/api/login_check', [
            'username' => 'wronguser',
            'password' => 'wrongpass',
        ]);

        $this->assertResponseStatusCodeSame(401); // Unauthorized
    }

    protected function tearDown(): void
    {
        // Supprimer l'utilisateur après le test
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => 'test@example.com']);
        if ($user) {
            $this->em->remove($user);
            $this->em->flush();
        }

        parent::tearDown();
    }
}
