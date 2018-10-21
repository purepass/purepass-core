/**
 * purepass shall be a pure function that , and an optional options object
 * the function will not depend on any context, every function call with the same parameters will yield the same string
 * the 'algorithm' is as follows:
 * namespace is a string of 2 *letters* in length that may be passed in as an option
 * namespace defaults to 'Un' representing 'undefined'
 * specialCharacter is a single character string, and is any character found in
 */

const SHA256 = require('crypto-js/sha256')
import * as validate from './validators'

import myABCs from './myABCs'
class PurePassOptions {
  constructor(
    public namespace?: string,
    public specialCharacter?: string,
    public maxPasswordLength?: number,
    public failQuietly?: boolean
  ) {}
}
class PurePass {
  protected _defaultNamespace: string = 'Un'
  protected _defaultSpecialCharacter: string = '#'
  protected _defaultNumberString: string = '00'
  protected _defaultMaxPasswordLength: number = 64
  protected _defaultFailQuietly: boolean = false
  protected _myABCs: Array<string> = myABCs.split('')

  capitalize(namespace: string | null): string {
    if (namespace) {
      return `${namespace.charAt(0).toUpperCase()}${namespace.charAt(1).toLowerCase()}`
    }
    return this._defaultNamespace
  }

  getPrefix(namespaceSpaceOverride: string, specialCharacterOverride: string) {
    let specialCharacter = this._defaultSpecialCharacter
    let numberString = this._defaultNumberString
    let namespace = this._defaultNamespace
    // special character can be overriden at runtime

    if (specialCharacterOverride) {
      specialCharacter = specialCharacterOverride
    }

    if (namespaceSpaceOverride) {
      namespace = namespaceSpaceOverride
    }

    // if there is no namespace: strongly discouraged, the final prefix is always string `Un00${sChar}`
    // or if there is no specialCharacter passed in as an option simply string 'Un00#'

    // transform namespace
    let nsFormatted = this.capitalize(namespace) // make first letter uppercased, second letter lowercased

    const charPositionInABCs = this._myABCs.indexOf(`${nsFormatted.charAt(0)}`) + 1 // get the position of the letter in the alphabet, starting with A as 1
    numberString = ('0' + charPositionInABCs).slice(-2) // pad with leading zero if necessary, for uniformity.
    return `${nsFormatted}${numberString}${specialCharacter}` // should be 5 chars 1 special character, 2 digits, and an uppercase letter and a lowercase letter;
  }

  getSuffix(hash: string, leadingHashIndex: number, maxPasswordLengthOverride: number) {
    let maxPasswordLength = this._defaultMaxPasswordLength //

    if (maxPasswordLengthOverride) {
      maxPasswordLength = maxPasswordLengthOverride
    }

    return hash.substring(leadingHashIndex, maxPasswordLength)
  }

  public generatePassword(secret: string, options?: PurePassOptions) {

    let namespace: string = this._defaultNamespace
    let specialCharacter: string = this._defaultSpecialCharacter
    let maxPasswordLength: number = this._defaultMaxPasswordLength
    let failQuietly: boolean = this._defaultFailQuietly

    if (options) {
      // this block is mildly redundant, and reassigns instead of only assigning each var once
      namespace = options.namespace || this._defaultNamespace
      specialCharacter = options.specialCharacter || this._defaultSpecialCharacter
      maxPasswordLength = options.maxPasswordLength || this._defaultMaxPasswordLength
      failQuietly = options.failQuietly || this._defaultFailQuietly
    }

    const secretError = validate.secret(secret) // validation ensures secret is non-null

    // other validation is executed only if the given option is defined
    const namespaceError = namespace
      ? validate.namespace(namespace)
      : null

    const specialCharacterError = specialCharacter
      ? validate.specialCharacter(specialCharacter)
      : null

    const maxPasswordLengthError = maxPasswordLength
      ? validate.maxPasswordLength(maxPasswordLength)
      : null

    // array values are null if respective properties are valid
    const errorArray: Array<any> = [
      secretError,
      namespaceError,
      specialCharacterError,
      maxPasswordLengthError
    ]

    errorArray.forEach(e => {
      if (e) {
        // TODO: r  emove log prior to shipping
        console.log(JSON.stringify(e))
        if (failQuietly) {
          e.err()
          return
        }
        e.throw()
      } // bring the ruckus!
    })

    const normalizedNamespace = this.capitalize(namespace)
    const prefix = this.getPrefix(normalizedNamespace, specialCharacter)
    const hash = SHA256(`${secret}${normalizedNamespace}`).toString()
    const leadingHashIndex = prefix.length
    const suffix = this.getSuffix(hash, leadingHashIndex, maxPasswordLength)

    return `${prefix}${suffix}`
  }
}
export default new PurePass()
