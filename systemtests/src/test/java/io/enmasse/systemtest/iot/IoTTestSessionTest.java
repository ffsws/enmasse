/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

package io.enmasse.systemtest.iot;

import io.enmasse.iot.model.v1.IoTInfrastructure;
import io.enmasse.systemtest.iot.IoTTestSession.Adapter;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.concurrent.atomic.AtomicBoolean;

import static io.enmasse.systemtest.framework.TestTag.FRAMEWORK;
import static io.enmasse.systemtest.iot.IoTTestSession.Adapter.HTTP;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag(FRAMEWORK)
public class IoTTestSessionTest {

    @Test
    public void testNameInDefaultConfig() {
        var config = IoTTestSession.createDefaultInfrastructure("default-ns", true).build();

        assertDefaultConfig(config);
    }

    @Test
    public void testNameInDefaultConfigAfterChange() {
        var configBuilder = IoTTestSession.createDefaultInfrastructure("default-ns", true);

        assertDefaultConfig(configBuilder.build());

        for (Adapter adapter : Adapter.values()) {
            configBuilder = adapter.disable(configBuilder);
        }
        configBuilder = HTTP.enable(configBuilder);

        assertDefaultConfig(configBuilder.build());

    }

    private void assertDefaultConfig(IoTInfrastructure config) {
        assertNotNull(config);

        assertNotNull(config.getMetadata());
        assertEquals("default", config.getMetadata().getName());
        assertEquals("default-ns", config.getMetadata().getNamespace());
    }

    @Test
    public void testEnableAdapter() throws Exception {
        AtomicBoolean called = new AtomicBoolean();

        IoTTestSession
                .create("default-ns", true)
                .adapters(Adapter.HTTP)
                .infra(configBuilder -> {

                    var config = configBuilder.build();

                    assertNotNull(config.getSpec());
                    assertNotNull(config.getSpec().getAdapters());

                    assertNotNull(config.getSpec().getAdapters().getHttp());
                    assertEquals(Boolean.TRUE, config.getSpec().getAdapters().getHttp().getEnabled());

                    assertNotNull(config.getSpec().getAdapters().getMqtt());
                    assertEquals(Boolean.FALSE, config.getSpec().getAdapters().getMqtt().getEnabled());

                    called.set(true);

                    return configBuilder;

                });

        assertTrue(called.get());
    }

}
