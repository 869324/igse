package com.igse.backend.user;

import java.util.HashMap;
import java.util.Map;

public class PropertyTypeMap {
    public static final Map<String, String> PROPERTY_TYPE_MAP = Map.of(
            "detached", PropertyType.DETACHED.name(),
            "semi-detached", PropertyType.SEMI_DETACHED.name(),
            "terraced", PropertyType.TERRACED.name(),
            "flat", PropertyType.FLAT.name(),
            "cottage", PropertyType.COTTAGE.name(),
            "bungalow", PropertyType.BUNGALOW.name(),
            "mansion", PropertyType.MANSION.name());
}
