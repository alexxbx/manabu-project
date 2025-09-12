<?php
// tests/Entity/LessonTest.php
namespace App\Tests\Entity;

use App\Entity\Lesson;
use PHPUnit\Framework\TestCase;

class LessonTest extends TestCase
{
    public function testLessonSettersAndGetters()
    {
        $lesson = new Lesson();
        $lesson->setTitle('Hiragana')->setContent('Introduction aux hiragana');

        $this->assertEquals('Hiragana', $lesson->getTitle());
        $this->assertEquals('Introduction aux hiragana', $lesson->getContent());
    }
}
