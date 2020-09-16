import React from 'react';
import { ResponsiveFlexRow } from '../styled/index';

export function UserAuth() {
  return (
    <ResponsiveFlexRow>
      <form>
        <input></input>
        <input></input>
      </form>
      <button>login</button>
      <button>sign up</button>
    </ResponsiveFlexRow>
  )
}