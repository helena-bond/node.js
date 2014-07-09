foo = 'bar'
bar = 'baz'
guess = 10

result = 'correct' if guess == 10

launch = 'go'

prepare = (a = yes) ->
  a

if launch is 'go'
  console.log 'go' 
if launch isnt 'go' 
  console.log 'not go'

goForFlight = false

console.log 'do not go for flight' if !goForFlight
console.log 'do not go for flight' if not goForFlight
console.log 'do not go for flight' unless goForFlight 

if goForFlight or prepare()
  console.log 'gone for flight or prepared'

person =
  legs: 2
  hands: 2
  fingers: 2

characters = ['Tsunayoshi', 'Hibari', 'Mukuro']
for person in characters
  console.log 'Hi #{person}'

console.log person for person in characters when person isnt 'Tsunayoshi'

people = [
  name: 'Jeffrey'
  age: 27
,
  name: 'John'
  age: 13
,
  name: 'Jan'
  age: 42
]

console.log ( p for p in people when p.age >= 21 )

# $('h1').on 'click', => this.someMethod()

class Person
  constructor: (@name, @age) ->
  getBirthYear: ->
      new Date().getFullYear() - @age

man = new Person('Jeffrey', 27)    
console.log man.getBirthYear()

class Child extends Person