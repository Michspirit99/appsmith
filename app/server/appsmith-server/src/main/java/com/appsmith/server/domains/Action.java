package com.appsmith.server.domains;

import com.appsmith.external.models.ActionConfiguration;
import com.appsmith.external.models.ActionProvider;
import com.appsmith.external.models.BaseDomain;
import com.appsmith.external.models.Datasource;
import com.appsmith.external.models.Documentation;
import com.appsmith.external.models.PluginType;
import com.appsmith.external.models.Property;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document
@Deprecated
public class Action extends BaseDomain {

    String name;

    Datasource datasource;

    //Organizations migrated to workspaces, kept the field as depricated to support the old migration
    @Deprecated
    String organizationId;

    String workspaceId;

    String pageId;

    String collectionId;

    ActionConfiguration actionConfiguration;

    PluginType pluginType;

    Boolean executeOnLoad;

    /*
     * This is a list of fields specified by the client to signify which fields have dynamic bindings in them.
     * TODO: The server can use this field to simplify our Mustache substitutions in the future
     */
    List<Property> dynamicBindingPathList;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Boolean isValid;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Set<String> invalids;


    // This is a list of keys that the client whose values the client needs to send during action execution.
    // These are the Mustache keys that the server will replace before invoking the API
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Set<String> jsonPathKeys;

    @JsonIgnore
    String cacheResponse;

    String templateId; //If action is created via a template, store the id here.

    String providerId; //If action is created via a template, store the template's provider id here.

    @Transient
    ActionProvider provider;

    @Transient
    String pluginId;

    @JsonIgnore
    Boolean userSetOnLoad = false;

    Boolean confirmBeforeExecute = false;

    Documentation documentation;

    /**
     * If the Datasource is null, create one and set the autoGenerated flag to true. This is required because spring-data
     * cannot add the createdAt and updatedAt properties for null embedded objects. At this juncture, we couldn't find
     * a way to disable the auditing for nested objects.
     *
     * @return
     */
    public Datasource getDatasource() {
        if (this.datasource == null) {
            this.datasource = new Datasource();
            this.datasource.setIsAutoGenerated(true);
        }
        return datasource;
    }
}
