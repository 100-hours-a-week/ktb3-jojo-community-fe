export function createElement(type, config, ...children) {
  const props = {};
  let key = null;

  if (config != null) {
    if (config.key !== undefined) {
      key = String(config.key);
    }

    for (let propName in config) {
      if (propName !== "key") {
        props[propName] = config[propName];
      }
    }
  }

  return { type, props, key, children: children.flat() };
}

export function Fragment(props) {
  return props.children;
}
