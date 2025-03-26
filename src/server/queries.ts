import { auth } from '@clerk/nextjs/server';
import 'server-only';
import { db } from '~/server/db';

export async function getMyImages() {
    const user = await auth();

    if (!user.userId) {
        throw new Error('Unauthorized');
    }

    const images = await db.query.images.findMany({
        where(fields, operators) {
            return operators.eq(fields.userId, user.userId);
        },
        orderBy(fields, operators) {
            return operators.desc(fields.id);
        },
    });

    return images;
}
