function genericTypeScriptFunction<T>(value: T): T {
  return value;
}

console.log(genericTypeScriptFunction<number>(2));
