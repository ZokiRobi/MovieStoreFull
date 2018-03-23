IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE TABLE [Movies] (
        [Id] int NOT NULL IDENTITY,
        [Genre] nvarchar(max) NULL,
        [InCart] bit NOT NULL,
        [Name] nvarchar(max) NULL,
        [PhotoUrl] nvarchar(max) NULL,
        [Price] float NOT NULL,
        [Rating] int NOT NULL,
        [YearOfRelease] int NOT NULL,
        CONSTRAINT [PK_Movies] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE TABLE [Users] (
        [Id] int NOT NULL IDENTITY,
        [PasswordHash] varbinary(max) NULL,
        [PasswordSalt] varbinary(max) NULL,
        [Role] nvarchar(max) NULL,
        [Username] nvarchar(max) NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE TABLE [Photo] (
        [Id] int NOT NULL IDENTITY,
        [Description] nvarchar(max) NULL,
        [MovieId] int NOT NULL,
        [PublicId] nvarchar(max) NULL,
        [Url] nvarchar(max) NULL,
        [isMain] bit NOT NULL,
        CONSTRAINT [PK_Photo] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Photo_Movies_MovieId] FOREIGN KEY ([MovieId]) REFERENCES [Movies] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE TABLE [FavoriteMovies] (
        [Id] int NOT NULL IDENTITY,
        [MovieId] int NOT NULL,
        [UserId] int NOT NULL,
        CONSTRAINT [PK_FavoriteMovies] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_FavoriteMovies_Movies_MovieId] FOREIGN KEY ([MovieId]) REFERENCES [Movies] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_FavoriteMovies_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE INDEX [IX_FavoriteMovies_MovieId] ON [FavoriteMovies] ([MovieId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE INDEX [IX_FavoriteMovies_UserId] ON [FavoriteMovies] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    CREATE INDEX [IX_Photo_MovieId] ON [Photo] ([MovieId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180321123519_initial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180321123519_initial', N'2.0.1-rtm-125');
END;

GO

