<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231013070819 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create imovel table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('imovel');
        $table->addColumn('id', 'integer', ['autoincrement' => true]);
        $table->addColumn('title', 'string', ['length' => 255]);
        $table->addColumn('description', 'text');
        $table->addColumn('purchase_price', 'decimal', ['precision' => 10, 'scale' => 2]);
        $table->addColumn('sale_price', 'decimal', ['precision' => 10, 'scale' => 2]);
        $table->addColumn('profit_percentage', 'decimal', ['precision' => 5, 'scale' => 2]);
        $table->addColumn('in_stock', 'boolean');
        $table->addColumn('photo_id', 'string', ['length' => 36]);
        
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['photo_id']); // Definir uma chave única para a coluna 'photo_id'
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('imovel');
    }
}
