export default {
  namespaced: true,
  state: {
    cargoGroups: [
      { src:require('../../assets/images/cargo_group/misc.jpg'),
        value: 'Misc.',
        cargoHauled: [
          { value: 'Animal By Products' },
          { value: 'Business Documents / Non-Negotiable Securities' },
          { value: 'Caskets' },
          { value: 'Containerized Freight' },
          { value: 'Garbage' },
          { value: 'Mobile / Modular Homes' },
          { value: 'Recycling Materials' },
          { value: 'Resins' },
          { value: 'Salt' },
          { value: 'Scrap Metal' },
          { value: 'Other Misc.' }
        ]
      },
      {src:require('../../assets/images/cargo_group/bulid-supplies.jpg'),
        value: 'Building Supplies',
        cargoHauled: [
          { value: 'Carpet (Not Oriental)' },
          { value: 'Cement (Bulk)' },
          { value: 'Cement (Dry & Bagged)' },
          { value: 'Dyes, Inks & Paints, Non Hazardous' },
          { value: 'Electrical Supplies' },
          { value: 'Lumber' },
          { value: 'Marble / Granite / Other Stone Slabs' },
          { value: 'Mobile / Modular Homes' },
          { value: 'Pipe' },
          { value: 'Plumping Supplies' },
          { value: 'Tools' },
          { value: 'Wire (Not Fober Optic)' },
          { value: 'Wood Products (Not Furniture or Caskets)' },
          { value: 'Other Building Supplies' }
        ]
      },
      {src:require('../../assets/images/cargo_group/mashin-eqp.jpg'),
        value: 'Machinery / Equipment',
        cargoHauled: [
          { value: 'Communications Equipment' },
          { value: 'Construction Equipment' },
          { value: 'Electrical Equipment' },
          { value: 'Machinery' },
          { value: 'Medical Instruments' },
          { value: 'Office Equipment' },
          { value: 'Oilfield Equipment' },
          { value: 'Scientific Instruments & Equipment' },
          { value: 'Other Machinery / Equipment' }
        ]
      },
      {src:require('../../assets/images/cargo_group/aircraft.jpg'),
        value: 'Autos / Aircrafts / Boats',
        cargoHauled: [
          { value: 'Aircraft Engines' },
          { value: 'Aircraft Parts (Not Engines)' },
          { value: 'Auto Accessories / Parts (Not Tires)' },
          { value: 'Automobiles' },
          { value: 'Boats' },
          { value: 'Recreational Vehicles / Golf Carts' },
          { value: 'Tires' },
          { value: 'Travel Trailers' },
          { value: 'Other Autos / Aircrafts' }
        ]
      },
      {src:require('../../assets/images/cargo_group/consumaer-goods.jpg'),
        value: 'Consumer Goods',
        cargoHauled: [
          { value: 'Appliances' },
          { value: 'Carpet (Not Oriental)' },
          { value: 'Caskets' },
          { value: "CD's / DVD's / Videos Games / Tapes" },
          { value: 'Clothing & Shoes (Non-Designer)' },
          { value: 'Cosmetics / Perfume' },
          { value: 'Dept Store Mdse (mixed loads ie WalMart)' },
          { value: 'Furniture (New)' },
          { value: 'Household Goods (Mover)' },
          { value: 'Musical Instruments' },
          { value: 'Office Equipment' },
          { value: 'Pharmaceuticals (Over-the-Counter)' },
          { value: 'Spas / Hot Tubs' },
          { value: 'Sporting Goods' },
          { value: 'Toilet & Soap Products' },
          { value: 'Toys' },
          { value: 'Other Consumer Goods' }
        ]
      },
      {src:require('../../assets/images/cargo_group/papper.jpg'),
        value: 'Paper / Plastic / Glass',
        cargoHauled: [
          { value: 'Bottles (Plastic)' },
          { value: 'Containerized Freight' },
          { value: 'Glass Products' },
          { value: 'Metal Products' },
          { value: 'Packing Materials & Supplies' },
          { value: 'Paper & Paper Products' },
          { value: 'Plastic Products' },
          { value: 'Printed Material' },
          { value: 'Recycling Materials' },
          { value: 'Rubber Products (Not Tires)' },
          { value: 'Other Paper / Plastic / Glass' }
        ]
      },
      {src:require('../../assets/images/cargo_group/raw-mat.jpg'),
        value: 'Construction Materials (Raw)',
        cargoHauled: [
          { value: 'Asphalt' },
          { value: 'Cement (Bulk)' },
          { value: 'Cement (Dry & Bagged)' },
          { value: 'Gravel & Rock' },
          { value: 'Logs' },
          { value: 'Marble / Granite / Other Stone Slabs' },
          { value: 'Sand' },
          { value: 'Stone' },
          { value: 'Other Construction Materials (Raw)' }
        ]
      },
      {src:require('../../assets/images/cargo_group/coal.jpg'),
        value: 'Metals / Coal',
        cargoHauled: [
          { value: 'Aluminum' },
          { value: 'Coal' },
          { value: 'Coiled Steel' },
          { value: 'Iron (Raw)' },
          { value: 'Metal Products' },
          { value: 'Minerals (Non Precious)' },
          { value: 'Ore' },
          { value: 'Scrap Metal' },
          { value: 'Steel' },
          { value: 'Zinc' },
          { value: 'Other Metals / Coal' }
        ]
      },
      {src:require('../../assets/images/cargo_group/chemicl.jpg'),
        value: 'Chemicals',
        cargoHauled: [
          { value: 'Chemicals - Non Acidic' },
          { value: 'Chemicals - Non Corrosive' },
          { value: 'Chemicals - Non Flammable, Non Explosive' },
          { value: 'Cleaning Supplies & Compounds' },
          { value: 'Dyes, Inks & Paints, Non Hazardous' },
          { value: 'Liquids - Non Chemical or Non Petroleum' },
          { value: 'Other Chemicals' }
        ]
      },
      {src:require('../../assets/images/cargo_group/farms-ag.jpg'),
        value: 'Farming / Agriculture / Livestock',
        cargoHauled: [
          { value: 'Cattle' },
          { value: 'Cotton (Non-Ginned)' },
          { value: 'Feed' },
          { value: 'Fertilizer' },
          { value: 'Flowers (Cut)' },
          { value: 'Grain' },
          { value: 'Hay' },
          { value: 'Mulch / Top Soil & Fill' },
          { value: 'Plants Shrubs Trees (Not Temp. Control)' },
          { value: 'Plants Shrubs Trees (Temp. Controlled)' },
          { value: 'Poultry (Live)' },
          { value: 'Raw Tobacco Leaf (Bulk)' },
          { value: 'Salt' },
          { value: 'Seeds' },
          { value: 'Swine' },
          { value: 'Other Farming / Agriculture' },
          { value: 'Other Livestock' }
        ]
      },
      {src:require('../../assets/images/cargo_group/text-tile.jpg'),
        value: 'Textiles / Skins / Furs',
        cargoHauled: [
          { value: 'Cotton (Non-Ginned)' },
          { value: 'Hide & Skins' },
          { value: 'Raw Furs' },
          { value: 'Textiles' },
          { value: 'Other Textiles / Skins / Furs' }
        ]
      },
      {src:require('../../assets/images/cargo_group/food.jpg'),
        value: 'Food & Beverages',
        cargoHauled: [
          { value: 'Baked Goods' },
          { value: 'Beer / Wine (No Liquor)' },
          { value: 'Beverages' },
          { value: 'Canned Goods' },
          { value: 'Dairy' },
          { value: 'Eggs' },
          { value: 'Flour' },
          { value: 'Food (Frozen / Not Seafood)' },
          { value: 'Fruits' },
          { value: 'Ice Cream' },
          { value: 'Meats / Dressed Poultry' },
          { value: 'Oils (Edible)' },
          { value: 'Salt' },
          { value: 'Seafood (Fresh)' },
          { value: 'Seafood (Frozen)' },
          { value: 'Spices' },
          { value: 'Tea / Cofee' },
          { value: 'Vegetables' },
          { value: 'Other Food & Beverages' }
        ]
      }
    ]
  }
};
