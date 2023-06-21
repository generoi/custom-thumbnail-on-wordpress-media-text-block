(function(wp) {
  var el = wp.element.createElement;
  var withState = wp.compose.withState;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var InspectorControls = wp.blockEditor.InspectorControls;

  wp.hooks.addFilter(
    'blocks.registerBlockType',
    'gds/custom-media-text',
    function(settings, name) {
      if (name !== 'core/media-text') {
        return settings;
      }

      settings.attributes = {
        ...settings.attributes,
        thumbnailId: {
          type: 'number',
          default: 0
        },
        thumbnailUrl: {
          type: 'string',
          default: ''
        }
      };

      return settings;
    }
  );

  wp.hooks.addFilter(
    'editor.BlockEdit',
    'gds/custom-media-text',
    function(BlockEdit) {
      return function(props) {
        if (props.name !== 'core/media-text') {
          return el(
            BlockEdit,
            props
          );
        }

        var mediaType = props.attributes.mediaType;
        var mediaId = props.attributes.mediaId;

        if (mediaType !== 'video') {
          return el(
            BlockEdit,
            props
          );
        }

        return [
          el(
            BlockEdit,
            props
          ),
          el(
            InspectorControls,
            {},
            el(
              MediaUpload,
              {
                title: 'Upload Thumbnail',
                onSelect: function(media) {
                  props.setAttributes({
                    thumbnailId: media.id,
                    thumbnailUrl: media.url
                  });
                },
                allowedTypes: ['image'],
                value: props.attributes.thumbnailId,
                render: function(obj) {
                  return el(
                    wp.components.PanelBody,
                    {
                      title: 'Video Thumbnail',
                      initialOpen: true,
                    },
                    props.attributes.thumbnailUrl && el(
                      'img',
                      {
                        src: props.attributes.thumbnailUrl,
                        style: {
                          width: '100%',
                          maxWidth: '250px',
                          height: 'auto'
                        }
                      }
                    ),
                    el(
                      wp.components.Button,
                      {
                        isPrimary: true,
                        onClick: obj.open
                      },
                      props.attributes.thumbnailUrl ? 'Replace Image' : 'Upload Image'
                    )
                  );
                }
              }
            )
          )
        ];
      };
    }
  );
})(window.wp);
