import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Timer "mo:core/Timer";
import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Initialize storage actor. No storage logic needed in actor.
  // File upload logic is implemented in the prefabricated storage component at blob-storage/storage.mo,
  // so no file upload logic is needed in the main actor.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    categoryId : Nat;
    price : Float;
    imageUrl : Text;
    inStock : Bool;
    isFeatured : Bool;
    createdAt : Int;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  type Category = {
    id : Nat;
    name : Text;
    description : Text;
    imageUrl : Text;
    sortOrder : Nat;
  };

  module Category {
    public func compareBySortOrder(c1 : Category, c2 : Category) : Order.Order {
      Nat.compare(c1.sortOrder, c2.sortOrder);
    };
  };

  type CustomOrderRequest = {
    id : Nat;
    customerName : Text;
    phone : Text;
    email : Text;
    description : Text;
    orderType : Text;
    status : Text;
    createdAt : Int;
  };

  module CustomOrderRequest {
    public func compareByCreatedAt(a : CustomOrderRequest, b : CustomOrderRequest) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : Int;
  };

  module ContactMessage {
    public func compareByCreatedAt(a : ContactMessage, b : ContactMessage) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  // Use persistent maps for entity storage
  let products = Map.empty<Nat, Product>();
  let categories = Map.empty<Nat, Category>();
  let customOrders = Map.empty<Nat, CustomOrderRequest>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ID Counters
  var productIdCounter = 1;
  var categoryIdCounter = 1;
  var customOrderIdCounter = 1;
  var contactMessageIdCounter = 1;

  // User Profile Operations

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Category Operations

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray().sort(Category.compareBySortOrder);
  };

  public shared ({ caller }) func createCategory(name : Text, description : Text, imageUrl : Text, sortOrder : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };

    let id = categoryIdCounter;
    let category : Category = {
      id;
      name;
      description;
      imageUrl;
      sortOrder;
    };

    categories.add(id, category);
    categoryIdCounter += 1;
    id;
  };

  public shared ({ caller }) func updateCategory(id : Nat, name : Text, description : Text, imageUrl : Text, sortOrder : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };

    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category not found") };
      case (?existing) {
        let updated : Category = {
          id;
          name;
          description;
          imageUrl;
          sortOrder;
        };
        categories.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteCategory(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };

    categories.remove(id);
  };

  // Product Operations

  public query ({ caller }) func getProductsByCategory(categoryId : Nat) : async [Product] {
    products.values().toArray().filter(func(p) { p.categoryId == categoryId });
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func createProduct(name : Text, description : Text, categoryId : Nat, price : Float, imageUrl : Text, inStock : Bool, isFeatured : Bool) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    let id = productIdCounter;
    let product : Product = {
      id;
      name;
      description;
      categoryId;
      price;
      imageUrl;
      inStock;
      isFeatured;
      createdAt = 0;
    };

    products.add(id, product);
    productIdCounter += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, categoryId : Nat, price : Float, imageUrl : Text, inStock : Bool, isFeatured : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existing) {
        let updated : Product = {
          id;
          name;
          description;
          categoryId;
          price;
          imageUrl;
          inStock;
          isFeatured;
          createdAt = existing.createdAt;
        };
        products.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    products.remove(id);
  };

  public query ({ caller }) func searchProducts(term : Text) : async [Product] {
    let lowerTerm = term.toLower();
    products.values().toArray().filter(
      func(p) {
        p.name.toLower().contains(#text lowerTerm) or p.description.toLower().contains(#text lowerTerm)
      }
    );
  };

  // Custom Order Operations

  public shared ({ caller }) func submitCustomOrder(customerName : Text, phone : Text, email : Text, description : Text, orderType : Text) : async Nat {
    let id = customOrderIdCounter;
    let order : CustomOrderRequest = {
      id;
      customerName;
      phone;
      email;
      description;
      orderType;
      status = "pending";
      createdAt = 0;
    };

    customOrders.add(id, order);
    customOrderIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllCustomOrders() : async [CustomOrderRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view custom orders");
    };
    customOrders.values().toArray().sort(CustomOrderRequest.compareByCreatedAt);
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (customOrders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?existing) {
        let updated : CustomOrderRequest = {
          id;
          customerName = existing.customerName;
          phone = existing.phone;
          email = existing.email;
          description = existing.description;
          orderType = existing.orderType;
          status;
          createdAt = existing.createdAt;
        };
        customOrders.add(id, updated);
      };
    };
  };

  // Contact Message Operations

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let id = contactMessageIdCounter;
    let contact : ContactMessage = {
      id;
      name;
      email;
      phone;
      message;
      createdAt = 0;
    };

    contactMessages.add(id, contact);
    contactMessageIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };

    contactMessages.values().toArray().sort(ContactMessage.compareByCreatedAt);
  };
};
