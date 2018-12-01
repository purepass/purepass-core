const Erric = require('easy-e')
const currentTypeOf = require('current-type-of')
import mySpecialCharacters from './mySpecialCharacters'

export const secret = (secret: string) => {
  if (!secret) {
    // only mandatory param
    let e = new Erric('purepass/validators/validate.secret/(!secret)')
    e.setMessageForHumans('secret must be provided as first param')
    e.setMetadata({
      input: {
        secret
      }
    })
    return e
  }

  if (currentTypeOf(secret) !== 'string') {
    let e = new Erric(`purepass/validators/validate.secret/(currentTypeOf(secret)!='string')`)
    e.setMessageForHumans('first parameter "secret" must be a string')
    e.setMetadata({
      input: {
        secret
      }
    })
    return e
  }
  return null
}

export const namespace = (namespace: string) => {
  if (currentTypeOf(namespace) !== 'string') {
    let e = new Erric(`purepass/validators/validate.namespace/(currentTypeOf(namespace)!='string')`)
    e.setMessageForHumans('if specified options["namespace"] must be a string if defined')
    e.setMetadata({
      input: {
        namespace
      }
    })
    return e
  }

  if (namespace.length !== 2) {
    let e = new Erric('purepass/validators/validate.namespace/(namespace.length!==2)')
    e.setMessageForHumans(
      'if specified, options["namespace"] must be a string 2 characters in length'
    )
    e.setMetadata({
      input: {
        namespace
      },
      lengthOfNamespace: namespace.length
    })
    return e
  }
  return null
}

export const maxPasswordLength = (maxPasswordLength: number) => {
  if (maxPasswordLength) {
    if (currentTypeOf(maxPasswordLength) !== 'number') {
      let e = new Erric('purepass/valudateArgs/currentTypeOf(maxPasswordLength)!="number"')
      e.setMessageForHumans('if specified options["maxPasswordLength"] must be a number')
      e.setMetadata({
        input: {
          maxPasswordLength
        }
      })
      return e
    }

    if (maxPasswordLength <= 13) {
      let e = new Erric('purepass/valudateArgs/(maxPasswordLength<=13)')
      e.setMessageForHumans(
        'if specified, options["maxPasswordLength"] must be greater than 13, if not specified it will default to 64'
      )
      e.setMetadata({
        input: {
          maxPasswordLength
        }
      })
      return e
    }
  }
  return null
}

export const specialCharacter = (specialCharacter: string) => {
  if (specialCharacter) {
    if (currentTypeOf(specialCharacter) === 'string') {
      if (specialCharacter.length !== 1) {
        let e = new Erric('purepass/validateArgs/specialCharacter.length!=1')
        e.setMessageForHumans('if specified, length of string "specialCharacter" must be exactly 1')
        e.setMetadata({
          input: {
            specialCharacter
          }
        })
        return e
      }

      if (mySpecialCharacters.indexOf(specialCharacter) < -1) {
        let e = new Erric('purepass/validateArgs/specialCharacter/not-in-mySpecialCharacters')
        e.setMessageForHumans(
          `if specified, "specialCharacter" must be one of the following characters \n ${mySpecialCharacters}`
        )
        e.setMetadata({
          input: {
            specialCharacter
          }
        })
        return e
      }
    }
  }
  return null
}
