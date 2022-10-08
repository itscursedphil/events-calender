import dayjs from 'dayjs';

/* eslint-disable no-param-reassign */
export default {
  async beforeCreate(event) {
    const { user } = (strapi as any).requestContext.get().state;

    // Only apply mutations for frontend users, not for admin users
    if (user.role.type === 'authenticated') {
      const { id: userId } = user;

      event.params.data = {
        ...event.params.data,
        publishedAt: dayjs().toISOString(),
        attendees: [userId],
      };
    }
  },
};
