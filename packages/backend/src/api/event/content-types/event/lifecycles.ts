import dayjs from 'dayjs';
import nanoid from 'nanoid/generate';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/* eslint-disable no-param-reassign */
export default {
  beforeCreate: async (event) => {
    const { user } = (strapi as any).requestContext.get().state;

    const uid = nanoid(alphabet, 16);

    // Only apply mutations for frontend users, not for admin users
    if (user.role?.type === 'authenticated') {
      const { id: userId } = user;

      event.params.data = {
        ...event.params.data,
        uid,
        publishedAt: dayjs().toISOString(),
        attendees: [userId],
        creator: userId,
      };
    } else {
      event.params.data = {
        ...event.params.data,
        uid,
      };
    }
  },
  beforeUpdate: async (event) => {
    const { uid, ...data } = event.params.data;

    // Disable possibility to update uid
    event.params.data = data;
  },
  beforeFindOne: async (event) => {
    const { id, ...where } = event.params.where;

    if (id.length === 16) {
      event.params.where = {
        ...where,
        uid: id,
      };
    }
  },
};
