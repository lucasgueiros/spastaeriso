package br.com.pastaeriso.api.generics.replacements;

import java.util.Map;
import java.util.Set;

import lombok.NonNull;

public class ReplacementMap<T> {

	public Map<T, Replacement<T>> map;

	public void setMap(Map<T, Replacement<T>> map) {
		this.map = map;
	}

	public Replacement<T> getReplacement(T from, T to) {
		return map.get(from);
	}

	public Replacement<T> getReplacement(@NonNull T from, Set<T> to) {
		return map.get(from);
	}

}
