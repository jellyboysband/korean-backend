class ServiceRepository {
  static admin(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      username: entity.username,
      tokens: entity.tokens,
      deleted: entity.deleted
    };
  }
  static brand(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
      deleted: entity.deleted
    };
  }
  static tag(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
      deleted: entity.deleted
    };
  }

  static order(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.phone,
      data: entity.data,
      createdAt: entity.createdAt,
      cost: entity.cost,
      status: entity.status
    };
  }
  static product(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      apply: entity.apply,
      price: entity.price,
      brandId: entity.brand,
      brand: entity.brand ? ServiceRepository.brand(entity.brand) : null,
      tags: entity.tags ? entity.tags.map(tag => ServiceRepository.tag(tag)) : [],
      avatarUrl: entity.avatarUrl,
      deleted: entity.deleted
    };
  }
}

module.exports = ServiceRepository;
