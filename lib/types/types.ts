//symbols as identifiers but you can also use classes and or string literals.

const TYPES = {
    UserRepository: Symbol.for("UserRepository"),
    UserModel: Symbol.for("UserModel"),
    HashService: Symbol.for('HashService'),
    JwtService: Symbol.for('JwtService')
};

export {TYPES};
