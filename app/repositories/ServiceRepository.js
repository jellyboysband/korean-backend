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
  static category(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name,
      parentId: entity.parentId,
      deleted: entity.deleted
    };
  }
  static extra(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      price: entity.price,
      volume: entity.volume,
      weight: entity.weight,
      productId: entity.productId,
      avatarUrl: entity.avatarUrl,
      product: ServiceRepository.product(entity.product)
    };
  }

  static order(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      phone: entity.phone,
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
      categories: entity.categories ? entity.categories.map(category => ServiceRepository.category(category)) : [],

      deleted: entity.deleted,
      extras: entity.extras ? entity.extras.map(ServiceRepository.extra) : []
    };
  }
}

module.exports = ServiceRepository;
