Lưu ý:

1. The r value can be between 0x1 and 0xFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE BAAEDCE6 AF48A03B BFD25E8C D0364140 (inclusive)
2. The s value must be in the lower half of the curve order. If the signature is too high, convert it to a lower s according to BIP-0062 with the corresponding curve orders using order - s. For secp256k1, the curve order is 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141. For secp256r1, the curve order is 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551 defined in Standards for Efficient Cryptography.
