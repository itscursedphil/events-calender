import dayjs from 'dayjs';
import nanoid from 'nanoid/generate';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const createUid = () => nanoid(alphabet, 16);

// TODO: Find better way to verify if user is strapi admin user or users persmissions user
const testUserIsUsersPermissionsUser = (user) =>
  typeof user?.provider !== 'undefined';

/* eslint-disable no-param-reassign */
export default {
  beforeCreate: async (event) => {
    const { user } = (strapi as any).requestContext.get()?.state || {};
    const { data } = event.params;

    const uid = createUid();

    const strapiUidService = strapi.service<any>('plugin::content-manager.uid');
    const slug = await strapiUidService.generateUIDField({
      contentTypeUID: 'api::event.event',
      field: 'slug',
      data,
    });

    if (testUserIsUsersPermissionsUser(user)) {
      const { id: userId } = user;

      event.params.data = {
        ...event.params.data,
        uid,
        slug,
        publishedAt: dayjs().toISOString(),
        attendees: [userId],
        creator: userId,
      };
    } else {
      event.params.data = {
        ...event.params.data,
        uid,
        slug,
      };
    }
  },
  beforeUpdate: async (event) => {
    const { user } = (strapi as any).requestContext.get()?.state || {};

    const { uid, slug, ...data } = event.params.data;

    // Disable possibility to update uid or slug
    if (testUserIsUsersPermissionsUser(user)) {
      event.params.data = data;
    } else {
      event.params.data = data;
    }
  },
  beforeFindOne: async (event) => {
    const { id, ...where } = event.params.where;

    if (id?.length === 16) {
      event.params.where = {
        ...where,
        uid: id,
      };
    }
  },
};
