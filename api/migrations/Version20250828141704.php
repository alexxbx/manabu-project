<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250828141704 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE user_achievement (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, achievement_id INT NOT NULL, unlocked_at DATETIME DEFAULT NULL, INDEX IDX_3F68B664A76ED395 (user_id), INDEX IDX_3F68B664B3EC99FE (achievement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_achievement ADD CONSTRAINT FK_3F68B664A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_achievement ADD CONSTRAINT FK_3F68B664B3EC99FE FOREIGN KEY (achievement_id) REFERENCES achievement (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE achievement DROP FOREIGN KEY FK_96737FF1A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_96737FF1A76ED395 ON achievement
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE achievement DROP user_id, DROP unlocked_at
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE user_achievement DROP FOREIGN KEY FK_3F68B664A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_achievement DROP FOREIGN KEY FK_3F68B664B3EC99FE
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_achievement
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE achievement ADD user_id INT DEFAULT NULL, ADD unlocked_at DATETIME DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE achievement ADD CONSTRAINT FK_96737FF1A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_96737FF1A76ED395 ON achievement (user_id)
        SQL);
    }
}
