const ActivityService = require('../../app/services/ActivityService');

class UserSuite {
  static async createActivity(userId) {
    const data = {
      userId,
      source: 'googleFit',
      // eslint-disable-next-line no-mixed-operators
      startTime: new Date(Date.now() - 1000 * 60),
      endTime: new Date(),
      activityType: 'test',
      dataSourceId: 'test',
      mapData: [
        {
          latitude: 0.13,
          longitude: 3.1,
          timestamp: Date.now()
        }
      ]
    };
    const activity = ActivityService.create(data);
    return activity;
  }
  static async getById(id) {
    return await ActivityService.getById(id);
  }
}
module.exports = UserSuite;
