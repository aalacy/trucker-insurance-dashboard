export default {
  namespaced: true,
  state: {
    cargoGroups: [
      { src:require('../../assets/images/cargo_group/misc.jpg'),
        value: 'Misc.',
        cargoHauled: [
          { value: 'Animal By Products',img: require('../../assets/images/cargo_haul/misc/Animal-By-Products.jpg')},
          { value: 'Business Documents / Non-Negotiable Securities',img: require('../../assets/images/cargo_haul/misc/Business-Documents--Non-Negotiable-Securities.jpg' )},
          { value: 'Caskets',img: require('../../assets/images/cargo_haul/misc/Caskets.jpg') },
          { value: 'Containerized Freight',img: require('../../assets/images/cargo_haul/misc/Containerized-Freight.jpg') },
          { value: 'Garbage' ,img: require('../../assets/images/cargo_haul/misc/garbage.jpg')},
          { value: 'Mobile / Modular Homes',img: require('../../assets/images/cargo_haul/misc/Mobile--Modular-Homes.jpg') },
          { value: 'Recycling Materials',img: require('../../assets/images/cargo_haul/misc/Recycling-Materials.jpg') },
          { value: 'Resins',img: require('../../assets/images/cargo_haul/misc/Resins.jpg') },
          { value: 'Salt',img: require('../../assets/images/cargo_haul/misc/Salt.jpg') },
          { value: 'Scrap Metal',img: require('../../assets/images/cargo_haul/misc/Scrap-Metal.jpg') },
          { value: 'Other Misc.',img: require('../../assets/images/cargo_haul/misc/Caskets.jpg') }
        ]
      },
      {src:require('../../assets/images/cargo_group/bulid-supplies.jpg'),
        value: 'Building Supplies',
        cargoHauled: [
          { value: 'Carpet (Non-Oriental)',img: require('../../assets/images/cargo_haul/building_supplies/Carpet.jpg') },
          { value: 'Cement (Bulk)',img: require('../../assets/images/cargo_haul/building_supplies/cement_bulk.jpg') },
          { value: 'Cement (Dry & Bagged)',img: require('../../assets/images/cargo_haul/building_supplies/cement_bags.jpg')  },
          { value: 'Dyes, Inks & Paints, Non-Hazardous',img: require('../../assets/images/cargo_haul/building_supplies/art-art-materials-artwork-1053687.jpg') },
          { value: 'Electrical Supplies',img: require('../../assets/images/cargo_haul/building_supplies/clouds-conductor-current-189524.jpg') },
          { value: 'Lumber',img: require('../../assets/images/cargo_haul/building_supplies/lumber.jpg')  },
          { value: 'Marble / Granite / Other Stone Slabs' ,img: require('../../assets/images/cargo_haul/building_supplies/marble.jpg')  },
          { value: 'Mobile / Modular Homes',img: require('../../assets/images/cargo_haul/building_supplies/mobile.jpg') },
          { value: 'Pipe',img: require('../../assets/images/cargo_haul/building_supplies/pipe.jpg')  },
          { value: 'Pumping Supplies' ,img: require('../../assets/images/cargo_haul/building_supplies/pumping_supply.jpg') },
          { value: 'Tools' ,img: require('../../assets/images/cargo_haul/building_supplies/tools.jpg') },
          { value: 'Wire (Non-Fiber Optic)' ,img: require('../../assets/images/cargo_haul/building_supplies/wire-nonfab.png') },
          { value: 'Wood Products (Not Furniture or Caskets)' ,img: require('../../assets/images/cargo_haul/building_supplies/woodsproduct.jpg') },
          { value: 'Other Building Supplies',img: require('../../assets/images/cargo_haul/building_supplies/pipe.jpg')  }
        ]
      },
      {src:require('../../assets/images/cargo_group/mashin-eqp.jpg'),
        value: 'Machinery / Equipment',
        cargoHauled: [
          { value: 'Communications Equipment' ,img: require('../../assets/images/cargo_haul/machinary/CommunicationsEquipment.jpg') },
          { value: 'Construction Equipment' ,img: require('../../assets/images/cargo_haul/machinary/ConstructionEquipment.jpg') },
          { value: 'Electrical Equipment' ,img: require('../../assets/images/cargo_haul/machinary/ElectricalEquipment.jpg') },
          { value: 'Machinery',img: require('../../assets/images/cargo_haul/machinary/Machinery.jpg')  },
          { value: 'Medical Instruments',img: require('../../assets/images/cargo_haul/machinary/MedicalInstruments.jpg')  },
          { value: 'Office Equipment' ,img: require('../../assets/images/cargo_haul/machinary/OfficeEquipment.jpg') },
          { value: 'Oilfield Equipment' ,img: require('../../assets/images/cargo_haul/machinary/OilfieldEquipment.jpg') },
          { value: 'Scientific Instruments & Equipment' ,img: require('../../assets/images/cargo_haul/machinary/ScientificInstruments&Equipment.jpg') },
          { value: 'Other Machinery / Equipment',img: require('../../assets/images/cargo_haul/machinary/ScientificInstruments&Equipment.jpg') }
        ]
      },
      {src:require('../../assets/images/cargo_group/aircraft.jpg'),
        value: 'Autos / Aircrafts / Boats',
        cargoHauled: [
          { value: 'Aircraft Engines',img: require('../../assets/images/cargo_haul/air_craft/air-eng.jpg') },
          { value: 'Aircraft Parts (Not Engines)',img: require('../../assets/images/cargo_haul/air_craft/air-parts.jpg')  },
          { value: 'Auto Accessories / Parts (Not Tires)' ,img: require('../../assets/images/cargo_haul/air_craft/auto-without-tier.jpg') },
          { value: 'Automobiles' ,img: require('../../assets/images/cargo_haul/air_craft/auto-mobile.jpg') },
          { value: 'Boats',img: require('../../assets/images/cargo_haul/air_craft/boat.jpg')  },
          { value: 'Recreational Vehicles / Golf Carts' ,img: require('../../assets/images/cargo_haul/air_craft/golf-cart.jpg') },
          { value: 'Tires' ,img: require('../../assets/images/cargo_haul/air_craft/tires.jpg') },
          { value: 'Travel Trailers',img: require('../../assets/images/cargo_haul/air_craft/travel-tralier.jpg')  },
          { value: 'Other Autos / Aircrafts',img:require('../../assets/images/cargo_group/aircraft.jpg') }
        ]
      },
      {src:require('../../assets/images/cargo_group/consumaer-goods.jpg'),
        value: 'Consumer Goods',
        cargoHauled: [
          { value: 'Appliances' ,img: require('../../assets/images/cargo_haul/consumergoods/Appliances.jpg')},
          { value: 'Carpet (Non-Oriental)',img: require('../../assets/images/cargo_haul/consumergoods/Carpet(Not Oriental).jpg') },
          { value: 'Caskets' ,img: require('../../assets/images/cargo_haul/consumergoods/Caskets.jpg')},
          { value: "CD's / DVD's / Videos Games / Tapes",img: require('../../assets/images/cargo_haul/consumergoods/Videos-Games.jpg') },
          { value: 'Clothing & Shoes (Non-Designer)',img: require('../../assets/images/cargo_haul/consumergoods/Clothing.jpg') },
          { value: 'Cosmetics / Perfume' ,img: require('../../assets/images/cargo_haul/consumergoods/perfume.jpg')},
          { value: 'General Merchandise (i.e. for Walmart)' ,img: require('../../assets/images/cargo_haul/consumergoods/wallmart.jpg')},
          { value: 'Furniture (New)' ,img: require('../../assets/images/cargo_haul/consumergoods/Furniture(New).jpg')},
          { value: 'Household Goods (Mover)' ,img: require('../../assets/images/cargo_haul/consumergoods/house-goods.png')},
          { value: 'Musical Instruments' ,img: require('../../assets/images/cargo_haul/consumergoods/Musical_Instruments.jpg')},
          { value: 'Office Equipment' ,img: require('../../assets/images/cargo_haul/consumergoods/Office_Equipment.jpg')},
          { value: 'Pharmaceuticals (Over-the-Counter)' ,img: require('../../assets/images/cargo_haul/consumergoods/Pharmaceuticals(Over-the-Counter).jpg')},
          { value: 'Spas / Hot Tubs',img: require('../../assets/images/cargo_haul/consumergoods/spa.jpg') },
          { value: 'Sporting Goods' ,img: require('../../assets/images/cargo_haul/consumergoods/Sporting_Goods.jpg')},
          { value: 'Toilet & Soap Products',img: require('../../assets/images/cargo_haul/consumergoods/Toilet&SoapProducts.jpg') },
          { value: 'Toys' ,img: require('../../assets/images/cargo_haul/consumergoods/toys.jpg')},
          { value: 'Other Consumer Goods' ,img: require('../../assets/images/cargo_haul/consumergoods/Appliances.jpg')}
        ]
      },
      {src:require('../../assets/images/cargo_group/papper.jpg'),
        value: 'Paper / Plastic / Glass',
        cargoHauled: [
          { value: 'Bottles (Plastic)',img: require('../../assets/images/cargo_haul/paper/Bottles(Plastic).jpg') },
          { value: 'Containerized Freight',img: require('../../assets/images/cargo_haul/paper/bottles-container-daylight-802221.jpg')  },
          { value: 'Glass Products',img: require('../../assets/images/cargo_haul/paper/Glass_Products.jpg')  },
          { value: 'Metal Products',img: require('../../assets/images/cargo_haul/paper/Metal_Products.jpg')  },
          { value: 'Packaging Materials & Supplies' ,img: require('../../assets/images/cargo_haul/paper/Packing_Materials&Supplies.jpg') },
          { value: 'Paper & Paper Products',img: require('../../assets/images/cargo_haul/paper/Paper&PaperProducts.jpg') },
          { value: 'Plastic Products' ,img: require('../../assets/images/cargo_haul/paper/Plastic_Products.jpg') },
          { value: 'Printed Material',img: require('../../assets/images/cargo_haul/paper/Printed_Material.jpg')  },
          { value: 'Recycling Materials',img: require('../../assets/images/cargo_haul/paper/RecyclingMaterials.jpg')  },
          { value: 'Rubber Products (Not Tires)',img: require('../../assets/images/cargo_haul/paper/rubberProduct(noTier).png')  },
          { value: 'Other Paper / Plastic / Glass',img: require('../../assets/images/cargo_haul/paper/bottles-container-daylight-802221.jpg')  }
        ]
      },
      {src:require('../../assets/images/cargo_group/raw-mat.jpg'),
        value: 'Construction Materials (Raw)',
        cargoHauled: [
          { value: 'Asphalt' ,img: require('../../assets/images/cargo_haul/constuction/asphalt.jpg') },
          { value: 'Cement (Bulk)',img: require('../../assets/images/cargo_haul/building_supplies/cement_bulk.jpg') },
          { value: 'Cement (Dry & Bagged)',img: require('../../assets/images/cargo_haul/building_supplies/cement_bags.jpg') },
          { value: 'Gravel & Rock' ,img: require('../../assets/images/cargo_haul/constuction/gravel.jpg') },
          { value: 'Logs' ,img: require('../../assets/images/cargo_haul/constuction/logs.jpg') },
          { value: 'Marble / Granite / Other Stone Slabs' ,img: require('../../assets/images/cargo_haul/constuction/marble.jpg') },
          { value: 'Sand' ,img: require('../../assets/images/cargo_haul/constuction/sand.jpg') },
          { value: 'Stone' ,img: require('../../assets/images/cargo_haul/constuction/stone.jpg') },
          { value: 'Other Construction Materials (Raw)' ,img: require('../../assets/images/cargo_haul/constuction/asphalt.jpg') }
        ]
      },
      {src:require('../../assets/images/cargo_group/coal.jpg'),
        value: 'Metals / Coal',
        cargoHauled: [
          { value: 'Aluminum',img: require('../../assets/images/cargo_haul/metal/Aluminum.jpg') },
          { value: 'Coal',img: require('../../assets/images/cargo_haul/metal/coal.jpg')  },
          { value: 'Coiled Steel',img: require('../../assets/images/cargo_haul/metal/Coiled_Steel.jpg')  },
          { value: 'Iron (Raw)',img: require('../../assets/images/cargo_haul/metal/iron.jpg')  },
          { value: 'Metal Products',img: require('../../assets/images/cargo_haul/metal/Metal_Products.jpg')  },
          { value: 'Minerals (Non Precious)' ,img: require('../../assets/images/cargo_haul/metal/Minerals(Non Precious).jpg') },
          { value: 'Ore' ,img: require('../../assets/images/cargo_haul/metal/ore.jpg') },
          { value: 'Scrap Metal' ,img: require('../../assets/images/cargo_haul/metal/Scrap_Metal.jpg') },
          { value: 'Steel' ,img: require('../../assets/images/cargo_haul/metal/Steel.jpg') },
          { value: 'Zinc' ,img: require('../../assets/images/cargo_haul/metal/zinc.jpg') },
          { value: 'Other Metals / Coal',img: require('../../assets/images/cargo_haul/metal/Aluminum.jpg')  }
        ]
      },
      {src:require('../../assets/images/cargo_group/chemicl.jpg'),
        value: 'Chemicals',
        cargoHauled: [
          { value: 'Chemicals(Non-Acidic)',img: require('../../assets/images/cargo_haul/chemical/chemicals-non-acidic.png')},
          { value: 'Chemicals(Non-Corrosive)',img: require('../../assets/images/cargo_haul/chemical/chemical-nonalcoholic.jpg') },
          { value: 'Chemicals(Non-Flammable,Non-Explosive)' ,img: require('../../assets/images/cargo_haul/chemical/non-flmable.jpg')},
          { value: 'Cleaning Supplies & Compounds',img: require('../../assets/images/cargo_haul/chemical/cleaning.jpg') },
          { value: 'Dyes, Inks & Paints, Non-Hazardous' ,img: require('../../assets/images/cargo_haul/chemical/img-paints.jpg')},
          { value: 'Liquids(Non-Chemical or Non Petroleum)',img: require('../../assets/images/cargo_haul/chemical/liquied.jpg') },
          { value: 'Other Chemicals' ,img: require('../../assets/images/cargo_haul/chemical/chemical-2.jpg')}
        ]
      },
      {src:require('../../assets/images/cargo_group/farms-ag.jpg'),
        value: 'Farming / Agriculture / Livestock',
        cargoHauled: [
          { value: 'Cattle',img: require('../../assets/images/cargo_haul/farming/cattle.jpg')  },
          { value: 'Cotton (Unginned)',img: require('../../assets/images/cargo_haul/farming/cotton.jpg') },
          { value: 'Feed',img: require('../../assets/images/cargo_haul/farming/feed.png')  },
          { value: 'Fertilizer',img: require('../../assets/images/cargo_haul/farming/fertilizer.jpg')},
          { value: 'Flowers (Cut)',img: require('../../assets/images/cargo_haul/farming/flowers.jpg') },
          { value: 'Grain',img: require('../../assets/images/cargo_haul/farming/grain.jpg')  },
          { value: 'Hay',img: require('../../assets/images/cargo_haul/farming/hay.jpg')  },
          { value: 'Mulch / Top Soil & Fill' ,img: require('../../assets/images/cargo_haul/farming/mlutch.jpg') },
          { value: 'Plants Shrubs Trees (Not Temp. Control)',img: require('../../assets/images/cargo_haul/farming/tree-a.jpg')  },
          { value: 'Plants Shrubs Trees (Temp. Controlled)',img: require('../../assets/images/cargo_haul/farming/tem-controled.jpg')  },
          { value: 'Poultry (Live)',img: require('../../assets/images/cargo_haul/farming/poultry.jpg')  },
          { value: 'Raw Tobacco Leaf (Bulk)' ,img: require('../../assets/images/cargo_haul/farming/other_farming.jpg')  },
          { value: 'Salt',img: require('../../assets/images/cargo_haul/food/bake-bakery-baking-5765.jpg') },
          { value: 'Seeds',img: require('../../assets/images/cargo_haul/farming/seeds.jpg') },
          { value: 'Swine', img: require('../../assets/images/cargo_haul/farming/swine.jpg')},
          { value: 'Other Farming / Agriculture',img: require('../../assets/images/cargo_haul/farming/corn.png')  },
          { value: 'Other Livestock',img: require('../../assets/images/cargo_haul/farming/cotton.jpg')  }
        ]
      },
      {src:require('../../assets/images/cargo_group/text-tile.jpg'),
        value: 'Textiles / Skins / Furs',
        cargoHauled: [
          { value: 'Cotton (Unginned)',img: require('../../assets/images/cargo_haul/texttile/cotton.jpg')  },
          { value: 'Hide & Skins',img: require('../../assets/images/cargo_haul/texttile/hideskin.jpg')  },
          { value: 'Raw Furs' ,img: require('../../assets/images/cargo_haul/texttile/raw _furs.jpg') },
          { value: 'Textiles',img: require('../../assets/images/cargo_haul/texttile/texttile.jpg') },
          { value: 'Other Textiles / Skins / Furs',img: require('../../assets/images/cargo_haul/texttile/other-text.jpg') }
        ]
      },
      {src:require('../../assets/images/cargo_group/food.jpg'),
        value: 'Food & Beverages',
        cargoHauled: [
          { value: 'Baked Goods',img: require('../../assets/images/cargo_haul/food/baked-baking-bread-298217.jpg') },
          { value: 'Beer / Wine (No Liquor)',img: require('../../assets/images/cargo_haul/food/alcohol-alcoholic-beverage-bar-602750.jpg') },
          { value: 'Beverages',img: require('../../assets/images/cargo_haul/food/beverages-cold-colorful-1154756.jpg')  },
          { value: 'Canned Goods',img: require('../../assets/images/cargo_haul/food/canned_goods.png')  },
          { value: 'Dairy',img: require('../../assets/images/cargo_haul/food/calcium-cheese-dairy-416656.jpg')  },
          { value: 'Eggs' ,img: require('../../assets/images/cargo_haul/food/bowl-close-up-eggs-162712.jpg') },
          { value: 'Flour',img: require('../../assets/images/cargo_haul/food/flour.jpg')},
          { value: 'Food (Frozen / Not Seafood)',img: require('../../assets/images/cargo_haul/food/frozen_food.png')  },
          { value: 'Fruits',img: require('../../assets/images/cargo_haul/food/berries-citrus-citrus-fruits-1132047.jpg')  },
          { value: 'Ice Cream',img: require('../../assets/images/cargo_haul/food/berries-blurred-background-close-up-1352281.jpg')  },
          { value: 'Meats / Dressed Poultry',img: require('../../assets/images/cargo_haul/food/barbecue-blur-chicken-209406.jpg')  },
          { value: 'Oils (Edible)',img: require('../../assets/images/cargo_haul/food/beer-blur-bottle-5685.jpg')  },
          { value: 'Salt',img: require('../../assets/images/cargo_haul/food/bake-bakery-baking-5765.jpg') },
          { value: 'Seafood (Fresh)' ,img: require('../../assets/images/cargo_haul/food/catch-fish-fish-market-229789.jpg') },
          { value: 'Seafood (Frozen)',img: require('../../assets/images/cargo_haul/food/frozen_seafood.jpg')  },
          { value: 'Spices' ,img: require('../../assets/images/cargo_haul/food/spices.png') },
          { value: 'Tea / Coffee',img: require('../../assets/images/cargo_haul/food/aroma-aromatic-beans-434231.jpg')  },
          { value: 'Vegetables' ,img: require('../../assets/images/cargo_haul/food/vegetables.png') },
          { value: 'Other Food & Beverages',img: require('../../assets/images/cargo_group/food.jpg')  }
        ]
      }
    ]
  }
};
