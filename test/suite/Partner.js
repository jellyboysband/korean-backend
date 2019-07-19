const PartnerService = require('../../app/services/PartnerService');
const AgencyService = require('../../app/services/AgencyService');
const InstitutionService = require('../../app/services/InstitutionService');

class PartnerSuite {
  static async createAgency(title = 'agency') {
    return await AgencyService.create({ title });
  }
  static async createInstitution(title = 'institution') {
    return await InstitutionService.create({ title });
  }
  static async createPartner({
    title = 'partner',
    description = 'description',
    url = 'http://example.ru',
    agencyId,
    institutionId,
    address = 'asdasd',
    phone = '+71234567890',
    email = 'email@mail.com',
    images = ['http://example.ru']
  }) {
    const data = {
      title,
      description,
      url,
      agencyId,
      institutionId,
      address,
      phone,
      email,
      images
    };
    const partner = PartnerService.create(data);
    return partner;
  }
  static async getById(id) {
    return await PartnerService.getById(id);
  }
}
module.exports = PartnerSuite;
