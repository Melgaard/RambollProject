class Person {
	private personName: Map<string, string> = new Map()

	public setGivenName = (givenName: string) => {
		this.personName.set('givenName', givenName)
	}

	public getGivenName = (): string | undefined => {
		return this.personName.get('givenName')
	}

	public setPrefix = (prefix: string) => {
		this.personName.set('prefix', prefix)
	}

	public getPrefix = (): string | undefined => {
		return this.personName.get('prefix')
	}
}

type PersonProvider = {
	getPerson: (persons: Person[], givenName: string) => Person | undefined
	filterPrefix: (persons: Person[], prefix: string) => Person[]
}

class LocatorPersonProvider implements PersonProvider {
	getPerson = (persons: Person[], givenName: string) => {
		return persons.find((person) => person.getGivenName() == givenName)
	}

	filterPrefix = (persons: Person[], prefix: string) => {
		return persons.filter((person) => person.getPrefix() == prefix)
	}
}

class PersonProviderFactory {
	public createProvider(type: string) {
		if (type == 'manual') {
			return new LocatorPersonProvider()
		} else {
			return null
		}
	}
}


//Creating persons
const person0 = new Person()
person0.setPrefix('Mr.')
person0.setGivenName('John')

const person1 = new Person()
person1.setPrefix('Ms.')
person1.setGivenName('Jane')

const person2 = new Person()
person2.setPrefix('Ms.')
person2.setGivenName('Valery')

const person3 = new Person()
person3.setPrefix('Mr.')
person3.setGivenName('Vincent')

const person4 = new Person()
person4.setPrefix('Mx.')
person4.setGivenName('Charlie')

const persons = [person0, person1, person2, person3, person4]

//Retrieve persons and console.log
const config = 'manual'
const provider = new PersonProviderFactory().createProvider(config)

if (provider == null) {
	console.log('Provider is null')
	throw new Error('Exiting due to no provider')
}

const person = provider.getPerson(persons, 'John')
const personsMs = provider.filterPrefix(persons, 'Ms.')

console.log(person?.getPrefix())
console.log(person?.getGivenName())

console.log('\nMs(s)\n')
personsMs.forEach((personMs) => {
	console.log(personMs.getPrefix())
	console.log(personMs.getGivenName())
	console.log('\n')
})