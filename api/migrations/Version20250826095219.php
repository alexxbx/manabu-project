<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250826095219 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE chat_message DROP FOREIGN KEY FK_FAB3FC16A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat_message ADD CONSTRAINT FK_FAB3FC16A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51CCDF80196
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise CHANGE lesson_id lesson_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51CCDF80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session DROP FOREIGN KEY FK_4586AAFB1FB8D185
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session DROP FOREIGN KEY FK_4586AAFB9A4AA658
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session CHANGE guest_id guest_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session ADD CONSTRAINT FK_4586AAFB1FB8D185 FOREIGN KEY (host_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session ADD CONSTRAINT FK_4586AAFB9A4AA658 FOREIGN KEY (guest_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leaderboard DROP FOREIGN KEY FK_182E5253A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leaderboard ADD CONSTRAINT FK_182E5253A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE progression DROP FOREIGN KEY FK_D5B25073A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE progression ADD CONSTRAINT FK_D5B25073A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE leaderboard DROP FOREIGN KEY FK_182E5253A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE leaderboard ADD CONSTRAINT FK_182E5253A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat_message DROP FOREIGN KEY FK_FAB3FC16A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE chat_message ADD CONSTRAINT FK_FAB3FC16A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE progression DROP FOREIGN KEY FK_D5B25073A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE progression ADD CONSTRAINT FK_D5B25073A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise DROP FOREIGN KEY FK_AEDAD51CCDF80196
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise CHANGE lesson_id lesson_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE exercise ADD CONSTRAINT FK_AEDAD51CCDF80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session DROP FOREIGN KEY FK_4586AAFB1FB8D185
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session DROP FOREIGN KEY FK_4586AAFB9A4AA658
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session CHANGE guest_id guest_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session ADD CONSTRAINT FK_4586AAFB1FB8D185 FOREIGN KEY (host_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE game_session ADD CONSTRAINT FK_4586AAFB9A4AA658 FOREIGN KEY (guest_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
    }
}
