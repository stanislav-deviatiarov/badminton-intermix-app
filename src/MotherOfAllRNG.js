/*
 *  Mother of all random number generators
 *  George Marsaglia's The mother of all random number generators
 *  producing uniformly distributed pseudo random 32 bit values
 *  with period about 2^250.
 */

class MotherOfAllRNG {
    constructor(seed = Date.now()) {
        this.mother1 = new Array(10).fill(0);
        this.mother2 = new Array(10).fill(0);
        this.mStart = true;

        // Initialize with a seed
        this.seed = seed;
        this._initializeGenerators();
    }

    _initializeGenerators() {
        // Simple seeding based on the provided seed
        let s = this.seed;
        for (let i = 0; i < 10; i++) {
            this.mother1[i] = (s = (s * 1103515245 + 12345) % 2147483647) % 65536;
            this.mother2[i] = (s = (s * 1103515245 + 12345) % 2147483647) % 65536;
        }
        this.mStart = false;
    }

    random() {
        const m16Long = 65536; // 2^16
        const m16Mask = 0xFFFF; // mask for lower 16 bits
        const m15Mask = 0x7FFF; // mask for lower 15 bits
        const m31Mask = 0x7FFFFFFF; // mask for 31 bits
        const m32Double = 2147483647.0; // 2^32-1

        let pSeed = 0; // Placeholder for the 32-bit random number

        // Mother 1
        let m1_carry = this.mother1[0];
        for (let i = 9; i > 0; i--) {
            this.mother1[i] = this.mother1[i - 1];
        }
        let m1_new = (this.mother1[1] * 19688 + this.mother1[4] * 30345 + this.mother1[7] * 21908 + m1_carry);
        this.mother1[0] = Math.floor(m1_new / m16Long);
        this.mother1[1] = m1_new & m16Mask;

        // Mother 2
        let m2_carry = this.mother2[0];
        for (let i = 9; i > 0; i--) {
            this.mother2[i] = this.mother2[i - 1];
        }
        let m2_new = (this.mother2[1] * 18602 + this.mother2[4] * 18193 + this.mother2[7] * 26166 + m2_carry);
        this.mother2[0] = Math.floor(m2_new / m16Long);
        this.mother2[1] = m2_new & m16Mask;

        // Combine the outputs
        pSeed = (((this.mother1[1] & m15Mask) << 16) + this.mother2[1]);

        return pSeed / m32Double; // Normalize to a value between 0 (inclusive) and 1 (exclusive)
    }
}
export default MotherOfAllRNG;