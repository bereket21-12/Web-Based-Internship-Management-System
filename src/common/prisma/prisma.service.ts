import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async cleanDatabase() {
        // Here we are deleting all the data from the database when the app is in production
        if (process.env.NODE_ENV !== 'production') return;
        const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

        return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()))
    }
}
